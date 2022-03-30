const LUT = [
  {
    value: 1e9,
    symbol: "B",
  },
  {
    value: 1e6,
    symbol: "M",
  },
  {
    value: 1e3,
    symbol: "K",
  },
  {
    value: 1,
    symbol: "",
  },
]

const longNumFormatter = (num) => {
  let formatted = num

  for (let { value, symbol } of LUT) {
    if (formatted > value)
      formatted = `${
        Math.round((formatted / value + Number.EPSILON) * 100) / 100
      }${symbol}`
  }

  return formatted
}

export default longNumFormatter
