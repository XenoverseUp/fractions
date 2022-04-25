import { STORY_STATS_QUERY, ONE_DAY_IN_MILISECONDS } from "background/constants"

export async function getEarningData() {
  const res = await fetch("https://medium.com/me/partner/dashboard?format=json", {
    method: "GET",
  })

  const text = await res.text()
  const validJson = text.split("</x>")[1]
  const data = await JSON.parse(validJson)

  return data
}

export async function getEarningOfPost(post) {
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
          endAt: Date.now() + ONE_DAY_IN_MILISECONDS,
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
