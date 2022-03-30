const MonthlyReportLine = ({ date, monthlyTotal, monthlyTax }) => {
  const dated = new Date(date)

  return `
		<div class="monthly-report-line" title="Net $${(
      (monthlyTotal - monthlyTax) /
      100
    ).toFixed(2)}">
			<h3>${dated.getPreviousMonthName()}, ${dated.getAdjustedYear()}</h3>
			<p>$ ${(monthlyTotal / 100).toFixed(2)}</p>
		</div>
	`
}

export default MonthlyReportLine
