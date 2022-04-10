const getRate = async currency_code => {
  const res = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/pair/USD/${currency_code}`);
  const json = await res.json();

  if (json.result === "error") return null;

  return json.conversion_rate;
};

export default getRate;
