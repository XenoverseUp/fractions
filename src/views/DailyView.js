import htmlToNode from "../utils/htmlToNode.js"
import StatLine from "../components/StatLine.js"
import toReadable from "../utils/toReadable.js"

const DailyView = ({
  total,
  totalTax,
  monthlyTax,
  monthlyTotal,
  dailyReadingTime,
  yesterdayEarnings,
  valuableStoryId,
}) => {
  return htmlToNode(
    `
			<div id="daily">
				<div id="total">
					<div id="total-balance" title="Net $${((total - totalTax) / 100).toFixed(2)}">
						<h2> $ ${(total / 100).toFixed(2)} </h2>
						<p>with <span>$ ${(totalTax / 100).toFixed(2)}</span> tax</p>
					</div>
					<div id="chart">
						<img src="/src/assets/slider.svg" alt="slider" />
					</div>
				</div>
				<span id="separator">This Month</span>
				<div id="monthly">
					<article>
						<div id="monthly-balance" title="Net $${(
              (monthlyTotal - monthlyTax) /
              100
            ).toFixed(2)}">
							<h3>$ ${(monthlyTotal / 100).toFixed(2)}</h3>
							<p>with <span>$ ${(monthlyTax / 100).toFixed(2)}</span> tax</p>
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
              value: `$ ${(yesterdayEarnings / 100).toFixed(2)}`,
            })}		
						${StatLine({ title: "This Months's Estimated Earnings", value: "$ 387.95" })}		
						${StatLine({
              title: "Yesterday's Most Valuable Story",
              link: `https://medium.com/me/stats/post/${valuableStoryId}/`,
            })}		
					</div>
				</div>
			</div>
		`
  )
}

export default DailyView
