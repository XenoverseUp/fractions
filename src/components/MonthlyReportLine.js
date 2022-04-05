import longNumFormatter from "../utils/longNumformatter"

const MonthlyReportLine = ({ date, monthlyTotal, monthlyTax, taxRate }) => {
  let dated = date ? new Date(date) : new Date()
  monthlyTax = monthlyTax || (monthlyTotal * taxRate) / 100

  return `
		<div class="monthly-report-line" title="Net $${longNumFormatter(
      (monthlyTotal - monthlyTax) / 100
    )}">
			<h3>${dated.getPreviousMonthName()}, ${dated.getAdjustedYear()}</h3>
			<p>$ ${longNumFormatter(monthlyTotal / 100)}</p>
		</div>
	`
}

export default MonthlyReportLine
