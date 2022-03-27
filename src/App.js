import is from "./utils/is.js"
import LoginView from "./views/LoginView.js"
import DailyView from "./views/DailyView.js"
import MonthlyView from "./views/MonthlyView.js"

export const View = Object.freeze({
  LOGIN: 0,
  DAILY: 1,
  MONTHLY: 2,
  LOADING: 3,
  ERROR: 4,
  MPP_ENROLL: 5,
})

class App {
  #state = View.LOADING
  #root = document.getElementById("root")
  #duration = 250 //ms
  #data

  constructor() {
    chrome.runtime.sendMessage({ getData: true }, (res) => {
      try {
        this.#initializeApp(res.authenticated, res?.data)
        console.log(this.#data)
      } catch (error) {
        this.setState(View.ERROR)
      }
    })
  }

  async #initializeApp(authenticated, data = {}) {
    this.#data = data

    if (authenticated) this.setState(View.DAILY)
    else this.setState(View.LOGIN)
  }

  setState(nextState) {
    if (this.#state === nextState) return
    this.#updateUI(this.#state, nextState)
    this.#state = nextState
  }

  #updateUI(previousState, nextState) {
    this.#removeView(previousState)
    this.#renderView(nextState)
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
          dailyReadingTime: this.#data.dailyReadingTime,
          valuableStoryId: this.#data.valuableStoryId,
          yesterdayEarnings: this.#data.yesterdayEarnings,
        })
      )
      .if(state === View.DAILY)
      .is(MonthlyView())
      .if(state === View.MONTHLY)
      .else(null)

    setTimeout(() => {
      this.#root.appendChild(view)
      this.#root.children[0].style.animation = "fade-in ease-out 150ms forwards"
      this.#setEventHandlers(state)
    }, this.#duration * 1.4)
  }

  #removeView(state) {
    if (state == View.LOADING) {
      // Remove loading screen
      const loader = document.getElementById("loader")
      const loadingText = document.getElementById("loading-text")
      const spinners = document.querySelectorAll(".spinner")
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
      )

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
      )

      setTimeout(() => this.#root.removeChild(loader), this.#duration)
    } else {
      this.#root.children[0].style.animation =
        "fade-in ease-out 150ms reverse forwards"

      setTimeout(() => {
        this.#root.removeChild(this.#root.children[0])
      }, 150)
    }
  }

  #setEventHandlers(state) {
    if (state === View.DAILY) {
      const switchButton = document.querySelector("#monthly-button")

      switchButton.addEventListener("click", () => {
        this.setState(View.MONTHLY)
        console.log("done")
      })
    }
  }

  #removeEventHandlers(state) {
    if (state === View.DAILY) {
      const switchButton = document.querySelector("#monthly-button")
      switchButton.removeEventListener()
    }
  }
}

export default App
