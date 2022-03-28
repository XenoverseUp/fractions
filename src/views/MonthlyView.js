import h from "../utils/h.js"
import MonthlyReportLine from "../components/MonthlyReportLine.js"
import StatLine from "../components/StatLine.js"

const MonthlyView = ({
  monthlyTotal,
  monthlyTax,
  completedMonths,
  monthlyValuableStoryId,
}) => {
  return h(
    `
      <div id="monthly">
        <div id="monthly-total">
          <div id="monthly-balance" title="Net $331.12">
            <h2>$ ${(monthlyTotal / 100).toFixed(2)}</h2>
            <p>
              with <span>$ ${(monthlyTax / 100).toFixed(2)}</span> tax
            </p>
          </div>
        </div>
        <div id="monthly-stats">
          ${StatLine({ title: "Daily Average Earnings", value: `$ 11.84` })}
          ${StatLine({
            title: "Difference From Previous Month",
            value: `% 12.7`,
            icon: "▲",
            iconColor: 0x10cc00,
          })}
          ${StatLine({
            title: "This Month's Star Story",
            link: `https://medium.com/me/stats/post/${monthlyValuableStoryId}/`,
          })}
        </div>
        <span id="monthly-separator">Monthly Report</span>
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
