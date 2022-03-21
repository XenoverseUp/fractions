import is from "./utils/is.js";
import LoginView from "./views/LoginView.js";
import DailyView from "./views/DailyView.js";

export const View = Object.freeze({
	LOGIN: 0,
	DAILY: 1,
	MONTHLY: 2,
	LOADING: 3,
});

class App {
	#state = View.LOADING;
	#root = document.getElementById("root");
	#duration = 250; //ms
	#data;

	constructor() {
		chrome.runtime.sendMessage({ getData: true }, res => {
			this.#initializeApp(res.authenticated, res?.data);
			console.log(this.#data);
		});
	}

	async #initializeApp(authenticated, data = {}) {
		this.#data = data;

		if (authenticated) this.setState(View.DAILY);
		else this.setState(View.LOGIN);
	}

	setState(nextState) {
		if (this.#state === nextState) return;
		this.#updateUI(this.#state, nextState);
		this.#state = nextState;
	}

	#updateUI(previousState, nextState) {
		this.#removeView(previousState);
		this.#renderView(nextState);
	}

	#removeView(state) {
		if (state == View.LOGIN) {
			// Remove login screen
		} else if (state == View.DAILY) {
			// Remove daily screen
		} else if (state == View.MONTHLY) {
			// Remove monthly screen
		} else if (state == View.LOADING) {
			// Remove loading screen
			const loader = document.getElementById("loader");
			const loadingText = document.getElementById("loading-text");
			const spinners = document.querySelectorAll(".spinner");
			spinners.forEach((spinner, i) =>
				spinner.animate(
					[
						{
							opacity: 1,
						},
						{
							opacity: 0,
						},
					],
					{
						duration: this.#duration / 3,
						fill: "forwards",
						delay: (i - 1) * (this.#duration / 4),
					}
				)
			);

			loadingText.animate(
				[
					{ opacity: 1, transform: "scale(1)" },
					{
						opacity: 0,
						transform: "scale(.95)",
					},
				],
				{
					duration: this.#duration / 2,
					delay: this.#duration / 3,
					fill: "forwards",
				}
			);

			setTimeout(() => this.#root.removeChild(loader), this.#duration);
		}
	}

	#renderView(state) {
		const view = is(LoginView())
			.if(state === View.LOGIN)
			.is(
				DailyView({
					total: this.#data.total,
					totalTax: this.#data.totalTax,
					monthlyTax: this.#data.monthlyTax,
					monthlyTotal: this.#data.thisMonth,
				})
			)
			.if(state === View.DAILY)
			.else(null);

		setTimeout(() => {
			this.#root.appendChild(view);
			this.#root.children[0].style.animation =
				"fade-in ease-out 150ms forwards";
		}, this.#duration * 1.4);
	}
}

export default App;
