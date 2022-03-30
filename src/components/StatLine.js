const StatLine = ({ title, value, link, icon, iconColor }) => `
	<div class="stat-line">
		<h4>${title}:</h4>
		${
      link
        ? `<a href="${link}" target="_blank">Click</a>`
        : icon
        ? `<span> <span style="color: #${iconColor.toString(
            16
          )}">${icon}</span> ${value}</span>`
        : `<span>${value}</span>`
    }
	</div>
`

export default StatLine
