import h from "../utils/h.js"
import MonthlyReportLine from "../components/MonthlyReportLine.js"
import StatLine from "../components/StatLine.js"
import Separator from "../components/Separator.js"
import longNumFormatter from "../utils/longNumformatter.js"

const MonthlyView = ({
  monthlyTotal,
  monthlyTax,
  completedMonths,
  monthlyValuableStoryId,
}) => {
  const date = new Date()
  const previousMonthEarnings = completedMonths[0].amount
  const percentDifference =
    previousMonthEarnings === 0
      ? "∞"
      : (
          ((monthlyTotal - previousMonthEarnings) / previousMonthEarnings) *
          100
        ).toFixed(1)

  const increased = percentDifference > 0 || percentDifference === "∞"

  const icon = {
    value: increased ? "▲" : "▼",
    color: increased ? 0x10cc00 : 0xcc1800,
  }

  return h(
    `
      <div id="monthly">
        <div id="monthly-total">
          <button id="daily-button" title="Daily View">
            <img src="day.svg" alt="day" />
          </button>
          <div id="monthly-balance" title="Net $${longNumFormatter(
            (monthlyTotal - monthlyTax) / 100
          )}">
            <p>This month you've earned</p>
            <h2>$ ${longNumFormatter(monthlyTotal / 100)}</h2>
            <p>
              with <span>$ ${longNumFormatter(monthlyTax / 100)}</span> tax
            </p>
          </div>
        </div>
        <div id="monthly-stats">
          ${StatLine({
            title: "Daily Average Earnings",
            value: `$ ${longNumFormatter(
              monthlyTotal /
                (date.getDate() === 1 ? 1 : date.getDate() - 1) /
                100
            )}`,
          })}
          ${StatLine({
            title: "Difference From Previous Month",
            value: `% ${Math.abs(percentDifference)}`,
            icon: icon.value,
            iconColor: icon.color,
          })}
          ${StatLine({
            title: "This Month's Star Story",
            link: `https://medium.com/me/stats/post/${monthlyValuableStoryId}/`,
          })}
        </div>
        ${Separator({ title: "Monthly Report" })}
        <div id="monthly-report">
          ${completedMonths
            .map((month) =>
              MonthlyReportLine({
                monthlyTotal: month.amount,
                monthlyTax: month.tax,
                date: month.date,
              })
            )
            .join("\n")}
        </div>
      </div>
	  `
  )
}

export default MonthlyView
