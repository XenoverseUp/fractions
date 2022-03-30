import h from "../utils/h.js"
import MonthlyReportLine from "../components/MonthlyReportLine.js"
import StatLine from "../components/StatLine.js"
import Separator from "../components/Separator.js"

const MonthlyView = ({
  monthlyTotal,
  monthlyTax,
  completedMonths,
  monthlyValuableStoryId,
}) => {
  const date = new Date()
  const previousMonthEarnings = completedMonths[0].amount

  return h(
    `
      <div id="monthly">
        <div id="monthly-total">
          <div id="monthly-balance" title="Net $331.12">
            <p>This month you've earned</p>
            <h2>$ ${(monthlyTotal / 100).toFixed(2)}</h2>
            <p>
              with <span>$ ${(monthlyTax / 100).toFixed(2)}</span> tax
            </p>
          </div>
        </div>
        <div id="monthly-stats">
          ${StatLine({
            title: "Daily Average Earnings",
            value: `$ ${(
              monthlyTotal /
              (date.getDate() === 1 ? 1 : date.getDate() - 1) /
              100
            ).toFixed(2)}`,
          })}
          ${StatLine({
            title: "Difference From Previous Month",
            value: `% ${
              previousMonthEarnings === 0
                ? "∞"
                : (
                    ((monthlyTotal - previousMonthEarnings) /
                      previousMonthEarnings) *
                    100
                  ).toFixed(1)
            }`,
            icon: "▲",
            iconColor: 0x10cc00,
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
