import { getEarningData, getEarningOfPost, getAuthorData } from "background/utils"
import estimate from "background/estimate"
import safe from "_/safe"

chrome.runtime.onMessage.addListener((request, _, sendRes) => {
  if (request.getData) {
    getEarningData().then(res => {
      if (res.success) {
        const { payload } = res

        Promise.all(payload.postAmounts.map(({ post }) => getEarningOfPost(post)))
          .then(async results => {
            let postData = results.filter(result => result !== null)

            const dailyReadingTime = postData.reduce((aggr, post) => aggr + safe(post?.dailyStats?.at(-1)?.memberTtr), 0)

            let yesterdayEarnings = 0

            for (let post of postData) {
              if (safe(post?.earnings?.dailyEarnings?.at(-1)?.amount === 0)) break
              yesterdayEarnings += post.earnings?.dailyEarnings.at(-1)?.amount
            }

            let valuableStoryId,
              valuableStoryEarning = 0

            for (let post of postData) {
              const currentEarning = safe(post?.earnings?.dailyEarnings?.at(-1)?.amount)
              if (currentEarning > valuableStoryEarning) {
                valuableStoryEarning = currentEarning
                valuableStoryId = post.id
              }
            }

            const thisMonth =
              payload.currentMonthAmount.amount +
              safe(payload.currentMonthAmount?.hightowerConvertedMemberEarnings) +
              safe(payload.currentMonthAmount?.hightowerUserBonusAmount)

            const monthlyTax = thisMonth * safe(payload.userTaxWithholding.withholdingPercentage / 100)

            const total =
              [...payload.completedMonthlyAmounts].reduce(
                (aggr, month) => aggr + month.amount + safe(month?.hightowerConvertedMemberEarnings) + safe(month?.hightowerUserBonusAmount),
                0
              ) + thisMonth

            const taxRate = payload.userTaxWithholding.withholdingPercentage

            const totalTax =
              [...payload.completedMonthlyAmounts].reduce((aggr, month) => {
                const tax = month.state === 2 ? month?.withholdingAmount : safe(month?.amount) * (taxRate / 100)

                return aggr + tax
              }, 0) + monthlyTax

            const completedMonths = [
              ...payload.completedMonthlyAmounts.map(month => ({
                amount: safe(month?.amount) + safe(month?.hightowerConvertedMemberEarnings),
                tax: safe(month?.withholdingAmount),
                date: safe(month?.createdAt),
              })),
            ]

            const estimatedEarnings = estimate(thisMonth, safe(completedMonths?.[0].amount))

            const monthlyValuableStoryId = payload.postAmounts[0].post.id

            const { payload: authorData } = await getAuthorData(payload.userId)

            const data = {
              author: {
                profileLink: `https://medium.com/@${authorData.user.username}/`,
                audienceStatsLink: `https://medium.com/@${authorData.user.username}/audience/`,
                username: authorData.user.name,
                profilePic: authorData.user.imageId
                  ? `https://miro.medium.com/fit/c/400/400/${authorData.user.imageId}`
                  : "https://source.boringavatars.com/marble/400",
                country: payload.userTaxWithholding.treatyCountry,
                followers: safe(authorData?.references?.SocialStats?.[payload.userId]?.usersFollowedByCount),
                postCount: safe(authorData?.userMeta?.numberOfPostsPublished),
              },

              // Calculations
              total,
              taxRate,
              totalTax,
              thisMonth,
              monthlyTax,
              dailyReadingTime,
              yesterdayEarnings,
              valuableStoryId,
              valuableStoryEarning,
              completedMonths,
              monthlyValuableStoryId,
              estimatedEarnings,
            }

            sendRes({ authenticated: true, data })
          })
          .catch(err => console.log(err))
      } else if (res.success === false)
        if (res.error === "User does not have permission to partner program.")
          sendRes({
            authenticated: true,
            data: { error: "not enrolled to MPP" },
          })
        else
          sendRes({
            authenticated: false,
            data: { error: "not logged in" },
          })
    })
  }

  return true
})
