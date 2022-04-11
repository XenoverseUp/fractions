import h from "h";

import getSign from "_/getSign";
import convert from "_/convert";

import MonthlyReportLine from "c/MonthlyReportLine";
import StatLine from "c/StatLine";
import Separator from "c/Separator";

import Day from "a/day.svg";

const MonthlyView = ({ monthlyTotal, monthlyTax, taxRate, completedMonths, valuableStoryId, currency, rate }) => {
  const date = new Date();
  const previousMonthEarnings = completedMonths[0].amount;
  const percentDifference = previousMonthEarnings === 0 ? "∞" : (((monthlyTotal - previousMonthEarnings) / previousMonthEarnings) * 100).toFixed(1);

  const increased = percentDifference > 0 || percentDifference === "∞";

  const icon = {
    value: increased ? "▲" : "▼",
    color: increased ? 0x10cc00 : 0xcc1800,
  };

  return h(
    `
      <div id="monthly">
        <div id="monthly-total">
          <button id="daily-button" title="Daily View">
            <img src=${Day} alt="day" />
          </button>
          <div id="monthly-balance" title="Net ${getSign(currency)}${convert(rate, (monthlyTotal - monthlyTax) / 100).toShort()}">
            <p>This month you've earned</p>
            <h2>${getSign(currency)} ${convert(rate, monthlyTotal / 100).toShort()}</h2>
            <p>
              with <span>${getSign(currency)} ${convert(rate, monthlyTax / 100).toShort()}</span> tax
            </p>
          </div>
        </div>
        <div id="monthly-stats">
          ${StatLine({
            title: "Daily Average Earnings",
            value: `${getSign(currency)} ${convert(rate, monthlyTotal / (date.getDate() === 1 ? 1 : date.getDate() - 1) / 100).toShort()}`,
          })}
          ${StatLine({
            title: "Difference From Previous Month",
            value: `% ${Math.abs(percentDifference)}`,
            icon: icon.value,
            iconColor: icon.color,
          })}
          ${StatLine({
            title: "This Month's Star Story",
            link: `https://medium.com/me/stats/post/${valuableStoryId}/`,
          })}
        </div>
        ${Separator({ title: "Monthly Report" })}
        <div id="monthly-report">
          ${completedMonths.render(month =>
            MonthlyReportLine({
              monthlyTotal: convert(rate, month.amount),
              monthlyTax: convert(rate, month.tax),
              date: month.date,
              sign: getSign(currency),
              taxRate,
            })
          )}
        </div>
      </div>
	  `
  );
};

export default MonthlyView;
