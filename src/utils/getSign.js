const symbols = {
  USD: "$",
  EUR: "€",
  TRY: "₺",
}

const getSign = (code) => symbols[code] ?? code

export default getSign
