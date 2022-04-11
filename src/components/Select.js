import ArrowDown from "a/arrow-down.svg";

const Select = {
  Base: ({ value }, children) => `
		<div class="custom-select">
			<div class="value">${value}</div>
			<img src=${ArrowDown} alt="arrow down" />

			<div class="options">
				${children.render()}
			</div>
		</div>
	`,
  Option: value => `
		<div class="option"> ${value} </div>
	`,
};

export default Select;
