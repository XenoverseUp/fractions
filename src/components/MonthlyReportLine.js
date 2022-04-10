const MonthlyReportLine = ({ date, monthlyTotal, monthlyTax, taxRate }) => {
  let dated = date ? new Date(date) : new Date();
  monthlyTax = monthlyTax || (monthlyTotal * taxRate) / 100;

  return `
		<div class="monthly-report-line" title="Net $${((monthlyTotal - monthlyTax) / 100).toShort()}">
			<h3>${dated.getPreviousMonthName()}, ${dated.getAdjustedYear()}</h3>
			<p>$ ${(monthlyTotal / 100).toShort()}</p>
		</div>
	`;
};

export default MonthlyReportLine;
