import symbols from "data/currency_symbols.json";

const getSign = code => symbols[code] ?? code;

export default getSign;
