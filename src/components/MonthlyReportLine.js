const MonthlyReportLine = ({ date, monthlyTotal, monthlyTax }) => `
		<div className="monthly-report-line" title="Net $${(
      (monthlyTotal - monthlyTax) /
      100
    ).toFixed(2)}">
			<h3>${date}</h3>
			<p>$ ${(monthlyTotal / 100).toFixed(2)}</p>
		</div>
	`

export default MonthlyReportLine
