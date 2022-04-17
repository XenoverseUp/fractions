import { STORY_STATS_QUERY, ONE_DAY_IN_MILISECONDS } from "backend/constants";
import handled from "_/handled";
import safe from "_/safe";

chrome.runtime.onMessage.addListener((request, _, sendRes) => {
  if (request.getData) {
    getEarningData().then(res => {
      if (res?.name === "AbortError") sendRes({ authenticated: false, data: { error: "aborted" } });

      if (res.success) {
        const { payload } = res;

        Promise.all(payload.postAmounts.map(({ post }) => getEarningOfPost(post)))
          .then(results => {
            let postData = results.filter(result => result !== null);

            const dailyReadingTime = postData.reduce((aggr, post) => aggr + safe(post?.dailyStats?.at(-1)?.memberTtr), 0);

            let yesterdayEarnings = 0;

            for (let post of postData) {
              if (safe(post?.earnings?.dailyEarnings?.at(-1)?.amount === 0)) break;
              yesterdayEarnings += post.earnings?.dailyEarnings.at(-1)?.amount;
            }

            let valuableStoryId,
              valuableStoryEarning = 0;

            for (let post of postData) {
              const currentEarning = safe(post?.earnings?.dailyEarnings?.at(-1).amount);
              if (currentEarning > valuableStoryEarning) {
                valuableStoryEarning = currentEarning;
                valuableStoryId = post.id;
              }
            }

            const thisMonth =
              payload.currentMonthAmount.amount +
              safe(payload.currentMonthAmount?.hightowerConvertedMemberEarnings) +
              safe(payload.currentMonthAmount?.hightowerUserBonusAmount);

            const monthlyTax = thisMonth * safe(payload.userTaxWithholding.withholdingPercentage / 100);

            const total =
              [...payload.completedMonthlyAmounts].reduce(
                (aggr, month) => aggr + month.amount + safe(month?.hightowerConvertedMemberEarnings) + safe(month?.hightowerUserBonusAmount),
                0
              ) + thisMonth;

            const taxRate = payload.userTaxWithholding.withholdingPercentage;

            const totalTax =
              [...payload.completedMonthlyAmounts].reduce((aggr, month) => {
                const tax = month.state === 2 ? month?.withholdingAmount : safe(month?.amount) * (taxRate / 100);

                return aggr + tax;
              }, 0) + monthlyTax;

            const completedMonths = [
              ...payload.completedMonthlyAmounts.map(month => ({
                amount: safe(month?.amount) + safe(month?.hightowerConvertedMemberEarnings),
                tax: safe(month?.withholdingAmount),
                date: safe(month?.createdAt),
              })),
            ];

            const estimatedEarnings = estimate(thisMonth, safe(completedMonths?.[0].amount));

            const monthlyValuableStoryId = payload.postAmounts[0].post.id;

            const data = {
              userId: payload.userId,
              username: payload.username,
              country: payload.userTaxWithholding.treatyCountry,

              // Calculations
              total,
              taxRate,
              totalTax,
              thisMonth,
              monthlyTax,
              dailyReadingTime,
              yesterdayEarnings,
              valuableStoryId,
              completedMonths,
              monthlyValuableStoryId,
              estimatedEarnings,
            };

            sendRes({ authenticated: true, data });
          })
          .catch(err => console.log(err));
      } else if (res.success === false)
        if (res.error === "User does not have permission to partner program.")
          sendRes({
            authenticated: true,
            data: { error: "not enrolled to MPP" },
          });
        else
          sendRes({
            authenticated: false,
            data: { error: "not logged in" },
          });
    });
  }

  return true;
});

async function getEarningData() {
  const [err, res] = await handled(fetch, "https://medium.com/me/partner/dashboard?format=json", {
    method: "GET",
  });

  const text = await res.text();
  const validJson = text.split("</x>")[1];
  const data = await JSON.parse(validJson);

  return data;
}

async function getEarningOfPost(post) {
  let startDate = 0; // earning of all time!

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
          endAt: Date.now() + ONE_DAY_IN_MILISECONDS,
        },
        query: STORY_STATS_QUERY,
      }),
    });
    if (res.status !== 200) {
      const message = `Fail to fetch data: (${res.status}) - ${res.statusText}`;
      console.log("another log message", message);
      return [];
    }
    const text = await res.text();
    const payload = JSON.parse(text);
    return await payload.data.post;
  } catch (error) {
    return console.log(error);
  }
}

function estimate(currentMonth, previousMonth = currentMonth) {
  const now = new Date();
  const day = now.getDate();

  var d = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  monthDay = d.getDate();

  return currentMonth + (1 - (day - 1) / monthDay) * ((previousMonth + currentMonth) / 2);
}
