import h from "h";

import map from "_/map";
import toReadable from "_/toReadable";
import getSign from "_/getSign";
import convert from "_/convert";

import StatLine from "c/StatLine";
import Separator from "c/Separator";
import Select from "c/Select";

import levels from "data/levels.json";
import currencyCodes from "data/currency_codes.json";

const DailyView = ({
  total,
  totalTax,
  monthlyTax,
  monthlyTotal,
  dailyReadingTime,
  yesterdayEarnings,
  valuableStoryId,
  estimatedEarnings,
  currency,
  rate,
}) => {
  const totalInUSD = (total / 100).toFixed(2);

  const level = levels.find(level => totalInUSD < level.to && totalInUSD >= level.from);
  const levelNumber = levels.findIndex(l => l === level) + 1;

  const percent = map(totalInUSD, level?.from, level?.to, 0, 100) ?? 0;

  return h(
    `
    <div id="daily">
      <div id="total">
        <button id="monthly-button" title="Monthly View">
          <img src="month.svg" alt="moon" />
        </button>
        <div id="total-balance" >
          <h2 title="${getSign(currency)}${convert(rate, totalInUSD).toFixed(2)}"> 
            ${getSign(currency)} ${convert(rate, totalInUSD).toShort()} 
          </h2>
          <p title="Net ${getSign(currency)}${convert(rate, (total - totalTax) / 100).toShort()}">
            with <span>${getSign(currency)} ${convert(rate, totalTax / 100).toShort()} </span> tax
          </p>
        </div>
        <div id="chart">
          <div id="top">
            <span>Level ${levelNumber}</span>
            <div id="currency-converter">
              <p>Currency: </p>
              ${Select.Base(
                { value: currency },
                currencyCodes.map(code => (code !== currency ? Select.Option(code) : null))
              )}
            </div>
          </div>
          <div id="plot" title="%${percent.toShort()}">
            <img src="slider.svg" alt="slider" />
            <img src="slider-inner.png" alt="slider inner" style="--width: ${map(percent, 0, 100, 3, 97)}%" />
          </div>
          <div id="bottom">
              <span>${currency} ${convert(rate, level.from).toShort()}</span>
              <span>${currency} ${convert(rate, level.to).toShort()}</span>
          </div>
        </div>
      </div>
      ${Separator({ title: "This Month" })}
      <div id="monthly-stats">
        <article>
          <div id="monthly-balance">
            <h3 title="${getSign(currency)}${convert(rate, monthlyTotal / 100).toFixed(2)}">
              ${getSign(currency)} ${convert(rate, monthlyTotal / 100).toShort()}
            </h3>
            <p title="Net ${getSign(currency)}${convert(rate, (monthlyTotal - monthlyTax) / 100).toShort()}" >
              with <span>${getSign(currency)} ${convert(rate, monthlyTax / 100).toShort()}</span> tax
            </p>
          </div>
          <p id="info">
            Monthly earnings are updated daily based on where you live.
          </p>
        </article>
        <div id="stats">
          ${StatLine({
            title: "Today's Member Reading Time",
            value: toReadable(dailyReadingTime),
          })}		
          ${StatLine({
            title: "Yesterday's Earnings",
            value: `${getSign(currency)} ${convert(rate, yesterdayEarnings / 100).toShort()}`,
          })}		
          ${StatLine({
            title: "This Months's Estimated Earnings",
            value: `${getSign(currency)} ${convert(rate, estimatedEarnings / 100).toShort()}`,
          })}		
          ${StatLine({
            title: "Yesterday's Most Valuable Story",
            link: `https://medium.com/me/stats/post/${valuableStoryId}/`,
          })}		
        </div>
      </div>
    </div>
		`
  );
};

export default DailyView;
