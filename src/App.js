/* !TODO */

// Bind data ✅
// Slider fill animation ✅
// Estimate month-end earning ✅
// Split request line in background
// Modularize CSS for components and views
// Set up a bundler
// Currency converter

import "./prototypes/Date.js"
import LoginView from "./views/LoginView.js"
import DailyView from "./views/DailyView.js"
import MonthlyView from "./views/MonthlyView.js"
import EnrollView from "./views/EnrollView.js"
import Enum from "./utils/enum.js"

import fakeRes from "./data/valid.js"
import fakeRes2 from "./data/enroll-error.js"

export const View = Enum([
  "LOGIN",
  "DAILY",
  "MONTHLY",
  "LOADING",
  "ERROR",
  "MPP_ENROLL",
  "SKELETON",
])

class App {
  #state = View.LOADING
  #root = document.getElementById("root")
  #duration = 250 //ms
  #data

  constructor() {
    chrome.runtime.sendMessage({ getData: true }, (res) => {
      try {
        this.#initializeApp(res.authenticated, res?.data)
      } catch (error) {
        this.setState(View.ERROR)
      }
    })

    /* !! TESTS */
    // this.#initializeApp(false, fakeRes) // Logged out
    // this.#initializeApp(true, fakeRes) // Logged in
    // this.#initializeApp(true, fakeRes2) // MPP enroll error
  }

  async #initializeApp(authenticated, data = {}) {
    this.#data = data

    if (authenticated && data?.error) this.setState(View.MPP_ENROLL)
    else if (authenticated && !data?.error) this.setState(View.DAILY)
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
    const view =
      state === View.LOGIN
        ? LoginView()
        : state === View.MPP_ENROLL
        ? EnrollView()
        : state === View.DAILY
        ? DailyView({
            total: this.#data.total,
            totalTax: this.#data.totalTax,
            monthlyTax: this.#data.monthlyTax,
            monthlyTotal: this.#data.thisMonth,
            dailyReadingTime: this.#data.dailyReadingTime,
            valuableStoryId: this.#data.valuableStoryId,
            yesterdayEarnings: this.#data.yesterdayEarnings,
            estimatedEarnings: this.#data.estimatedEarnings,
          })
        : state === View.MONTHLY
        ? MonthlyView({
            monthlyTotal: this.#data.thisMonth,
            monthlyTax: this.#data.monthlyTax,
            taxRate: this.#data.taxRate,
            completedMonths: this.#data.completedMonths,
            valuableStoryId: this.#data.monthlyValuableStoryId,
          })
        : null

    setTimeout(() => {
      this.#root.appendChild(view)
      this.#root.children[0].style.animation = "fade-in ease-out 150ms forwards"
      this.#setEventHandlers(state)
    }, this.#duration)
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
        "fade-out ease-out 150ms forwards"

      setTimeout(() => {
        this.#removeEventHandlers(state)
        this.#root.removeChild(this.#root.children[0])
      }, 150)
    }
  }

  #setEventHandlers(state) {
    if (state === View.DAILY) {
      const switchButton = document.querySelector("#monthly-button")
      switchButton.addEventListener("click", () => this.setState(View.MONTHLY))
    } else if (state === View.MONTHLY) {
      const switchButton = document.querySelector("#daily-button")
      switchButton.addEventListener("click", () => this.setState(View.DAILY))
    }
  }

  #removeEventHandlers(state) {
    if (state === View.DAILY) {
      const switchButton = document.querySelector("#monthly-button")
      switchButton.removeEventListener("click", () =>
        this.setState(View.MONTHLY)
      )
    } else if (state === View.MONTHLY) {
      const switchButton = document.querySelector("#daily-button")
      switchButton.removeEventListener("click", () => this.setState(View.DAILY))
    }
  }
}

export default App
