const Select = {
  Base: ({ value }, children) => `
		<div class="custom-select">
			<div class="value">${value}</div>
			<img src="arrow-down.svg" alt="arrow down" />

			<div class="options">
				${children.join("\n")}
			</div>
		</div>
	`,
  Option: (value) => `
		<div class="option"> ${value} </div>
	`,
}

export default Select
