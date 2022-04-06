export const getRate = async (currency_code) => {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/pair/USD/${currency_code}`
  )

  if (res.result === "error") return null

  return res.conversion_rate
}
