const Select = {
  Base: ({ value, sign }, children) => `
		<div class="custom-select">
			<div class="value">${value}</div>
			<img src="arrow-down.svg" alt="arrow down" />

			<div class="options">
				${children.join("\n")}
			</div>
		</div>
	`,
  Option: (value, sign) => `
		<div class="option"> ${sign} ${value} </div>
	`,
}

export default Select
