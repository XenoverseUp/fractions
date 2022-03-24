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
            console.log(postData)

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
                (aggr, month) => aggr + safe(month?.withholdingAmount),
                0
              ) + monthlyTax

            const data = {
              userId: payload.userId,
              username: payload.username,
              country: payload.userTaxWithholding.treatyCountry,
              taxRate: payload.userTaxWithholding.withholdingPercentage,

              // calculations
              total,
              totalTax,
              thisMonth,
              monthlyTax,
              dailyReadingTime,
              yesterdayEarnings,
              valuableStoryId,
            }

            console.log(data)

            sendRes({ authenticated: true, data })
          })
          .catch((err) => console.log(err))
      } else if (res.success === false)
        sendRes({
          authenticated: false,
          error: "You must be logged in to perform this action.",
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
      // loadingFailed(message);
      console.log("another log message", message)
      return []
    }
    const text = await res.text()
    const payload = JSON.parse(text)
    return await payload.data.post
  } catch (error) {
    return loadingFailed(error)
  }
}
