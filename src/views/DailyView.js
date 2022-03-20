import htmlToNode from "../utils/htmlToNode.js";
import StatLine from "../components/StatLine.js";

const DailyView = ({ total, taxRate, level, monthlyTotal }) => {
	const totalTax = (total * taxRate) / 100;
	const monthlyTax = (monthlyTotal * taxRate) / 100;

	return htmlToNode(
		`
			<div id="daily">
				<div id="total">
					<div id="total-balance">
						<h2> $ ${total} </h2>
						<p>with <span>$ ${totalTax}</span> tax</p>
					</div>
					<div id="chart">
						<img src="/src/assets/slider.svg" alt="slider" />
					</div>
				</div>
				<span id="separator">This Month</span>
				<div id="monthly">
					<article>
						<div id="monthly-balance">
							<h3>$ ${monthlyTotal}</h3>
							<p>with <span>$ ${monthlyTax}</span> tax</p>
						</div>
						<p id="info">
							Monthly earnings are updated daily based on where you live.
						</p>
					</article>
					<div id="stats">
						${StatLine({ title: "Today's Member Reading Time", value: "12hr 53min" })}		
						${StatLine({ title: "Yesterday's Earnings", value: "$ 12.37" })}		
						${StatLine({ title: "This Months's Estimated Earnings", value: "$ 387.95" })}		
						${StatLine({
							title: "Yesterday's Most Valuable Story",
							link: "https://www.youtube.com/watch?v=2sCmuwTrgDU",
						})}		
					</div>
				</div>
			</div>
		`
	);
};

export default DailyView;
