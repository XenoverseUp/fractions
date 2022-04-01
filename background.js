const STORY_STATS_QUERY = `query StatsPostChart($postId: ID!, $startAt: Long!, $endAt: Long!) {
	post(id: $postId) {
			id
			...StatsPostChart_dailyStats
			...StatsPostChart_dailyEarnings
			__typename
	}
}

fragment StatsPostChart_dailyStats on Post {
	dailyStats(startAt: $startAt, endAt: $endAt) {
			periodStartedAt
			views
			internalReferrerViews
			memberTtr
			__typename
	}
	__typename
}

fragment StatsPostChart_dailyEarnings on Post {
	earnings {
			dailyEarnings(startAt: $startAt, endAt: $endAt) {
					periodEndedAt
					periodStartedAt
					amount
					__typename
			}
			lastCommittedPeriodStartedAt
			 __typename
			}
			__typename
	}`

const oneDayInMilliseconds = 24 * 3600 * 1000

// !TODO Firstly send authenticated data, then the heavy ones.

chrome.runtime.onMessage.addListener((request, _, sendRes) => {
  if (request.getData) {
    getEarningData().then((res) => {
      if (res.success) {
        const { payload } = res

        Promise.all(
          payload.postAmounts.map(({ post }) => getEarningOfPost(post))
        )
          .then((results) => {
            const postData = results.filter((result) => result !== null)

            const dailyReadingTime = postData.reduce(
              (aggr, post) => aggr + safe(post.dailyStats.at(-1)?.memberTtr),
              0
            )

            const yesterdayEarnings = postData.reduce(
              (aggr, post) =>
                aggr + safe(post.earnings.dailyEarnings.at(-1)?.amount),
              0
            )

            let valuableStoryId,
              valuableStoryEarning = 0

            for (let post of postData) {
              const currentEarning = safe(
                post?.earnings.dailyEarnings.at(-1).amount
              )
              if (currentEarning > valuableStoryEarning) {
                valuableStoryEarning = currentEarning
                valuableStoryId = post.id
              }
            }

            const taxRate = payload.userTaxWithholding.withholdingPercentage

            const thisMonth =
              payload.currentMonthAmount.amount +
              safe(
                payload.currentMonthAmount?.hightowerConvertedMemberEarnings
              ) +
              safe(payload.currentMonthAmount?.hightowerUserBonusAmount)

            const monthlyTax =
              thisMonth *
              safe(payload.userTaxWithholding.withholdingPercentage / 100)

            const total =
              [...payload.completedMonthlyAmounts].reduce(
                (aggr, month) =>
                  aggr +
                  month.amount +
                  safe(month?.hightowerConvertedMemberEarnings) +
                  safe(month?.hightowerUserBonusAmount),
                0
              ) + thisMonth

            const totalTax =
              [...payload.completedMonthlyAmounts].reduce(
                (aggr, month) =>
                  aggr + month?.withholdingAmount ??
                  (month.amount +
                    safe(month?.hightowerConvertedMemberEarnings)) /
                    taxRate,
                0
              ) + monthlyTax

            const completedMonths = [
              ...payload.completedMonthlyAmounts.map((month) => ({
                amount:
                  month.amount + safe(month?.hightowerConvertedMemberEarnings),
                tax: month.withholdingAmount,
                date: month.createdAt,
              })),
            ]

            const estimatedEarnings = estimate(
              thisMonth,
              completedMonths?.[0].amount
            )

            const monthlyValuableStoryId = payload.postAmounts[0].post.id

            const data = {
              userId: payload.userId,
              username: payload.username,
              country: payload.userTaxWithholding.treatyCountry,

              // Calculations
              taxRate,
              total,
              totalTax,
              thisMonth,
              monthlyTax,
              dailyReadingTime,
              yesterdayEarnings,
              valuableStoryId,
              completedMonths,
              monthlyValuableStoryId,
              estimatedEarnings,
            }

            sendRes({ authenticated: true, data })
          })
          .catch((err) => console.log(err))
      } else if (res.success === false)
        if (res.error === "User does not have permission to partner program.")
          sendRes({
            authenticated: true,
            data: { error: "not enrolled to MPP" },
          })
        else
          sendRes({
            authenticated: false,
            error: "not logged in",
          })
    })
  }

  return true
})

function safe(dangerousData) {
  return dangerousData ?? 0
}

async function getEarningData() {
  const res = await fetch("https://medium.com/me/partner/dashboard?format=json")
  const text = await res.text()
  const validJson = text.split("</x>")[1]
  const data = await JSON.parse(validJson)

  return data
}

async function getEarningOfPost(post) {
  let startDate = 0 // earning of all time!

  try {
    const res = await fetch("https://medium.com/_/graphql", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        accept: "*/*",
        "graphql-operation": "StatsPostChart",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        operationName: "StatsPostChart",
        variables: {
          postId: post.id,
          startAt: startDate,
          endAt: Date.now() + oneDayInMilliseconds,
        },
        query: STORY_STATS_QUERY,
      }),
    })
    if (res.status !== 200) {
      const message = `Fail to fetch data: (${res.status}) - ${res.statusText}`
      console.log("another log message", message)
      return []
    }
    const text = await res.text()
    const payload = JSON.parse(text)
    return await payload.data.post
  } catch (error) {
    return console.log(error)
  }
}

function estimate(currentMonth, previousMonth = currentMonth) {
  const now = new Date()
  const day = now.getDate()

  var d = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  monthDay = d.getDate()

  return (
    currentMonth +
    (1 - (day - 1) / monthDay) * ((previousMonth + currentMonth) / 2)
  )
}
