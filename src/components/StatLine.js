const StatLine = ({ title, value, link, icon, iconColor, popup }) => `
	<div class="stat-line">
		<h4>${title}:</h4>
		${
      link
        ? `<a ${popup ? `title="${popup}"` : ""} href="${link}" target="_blank">Click</a>`
        : icon
        ? `<span> <span style="color: #${iconColor.toString(16)}">${icon}</span> ${value}</span>`
        : `<span ${popup ? `title="${popup}"` : ""}>${value}</span>`
    }
	</div>
`

export default StatLine
