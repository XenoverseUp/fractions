const StatLine = ({ title, value, link }) => `
	<div class="stat-line">
		<h4>${title}:</h4>
		${
			link
				? `<a href="${link}" target="_blank">Click</a>`
				: `<span>${value}</span>`
		}
	</div>
`;

export default StatLine;
