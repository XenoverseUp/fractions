/* !TODO */

// Bind data ✅
// Slider fill animation ✅
// Estimate month-end earning ✅
// Modularize CSS for components and views ✅
// Set up a bundler ✅
// Currency converter ✅
// Report button
// MPP Enroll Illustration To SVG
// Drawer => Stats Page | Report | Theme | About Me | Support Me | Privacy Policy | Tracked Data
// Remove Footer
// Track Email Subscribers
// Animate currency converter arrow
// Split request line in background

import "prototypes/Date"
import "prototypes/Number"
import "prototypes/Array"

import Enum from "_/enum"

import LoadingView from "@/LoadingView"
import LoginView from "@/LoginView"
import DailyView from "@/DailyView"
import MonthlyView from "@/MonthlyView"
import EnrollView from "@/EnrollView"
import ReportView from "@/ReportView"

import getRate from "services/getRate"

import fakeRes from "data/valid"
import fakeRes2 from "data/enroll-error"

export const View = Enum(["LOGIN", "DAILY", "MONTHLY", "LOADING", "ERROR", "MPP_ENROLL", "REPORT"])

class App {
  #state = View.LOADING
  #root = document.getElementById("root")
  #duration = 250 //ms
  #data
  #currency = "USD"
  #rate = 1
  #report = {
    timer: null,
    timeout: 7500, //ms
    isReported: false,
  }

  constructor() {
    this.#renderView(View.LOADING)

    /* !! TESTS */

    // this.#initializeApp(false, fakeRes); // Logged out
    // this.#initializeApp(true, fakeRes); // Logged in
    // this.#initializeApp(true, fakeRes2); // MPP enroll error

    chrome.runtime.sendMessage({ getData: true }, res => {
      try {
        !this.#report.isReported && this.#initializeApp(res.authenticated, res?.data)
      } catch (error) {
        // this.setState(View.ERROR);
      }
    })
  }

  async #initializeApp(authenticated, data = {}) {
    this.#data = data

    if (authenticated && data?.error) this.setState(View.MPP_ENROLL)
    else if (authenticated && !data?.error) this.setState(View.DAILY)
    else if (!authenticated && data?.error === "aborted") this.setState(View.REPORT)
    else this.setState(View.LOGIN)
  }

  setState(nextState) {
    if (this.#state === nextState) return
    this.#updateUI(this.#state, nextState)
    this.#state = nextState
  }

  setVersion(version) {
    const v = document.getElementById("version-num")
    v.innerText = `v${version}`
  }

  async #updateCurrency(currency_code) {
    if (currency_code === this.#currency) return
    const rate = await getRate(currency_code)

    if (rate === null) return

    this.#currency = currency_code
    this.#rate = rate
    this.#updateUI(View.DAILY, View.DAILY)
  }

  #updateUI(previousState, nextState) {
    this.#removeView(previousState)
    this.#renderView(nextState)
  }

  #renderView(state) {
    const view =
      state === View.LOGIN
        ? LoginView()
        : state === View.LOADING
        ? LoadingView()
        : state === View.REPORT
        ? ReportView()
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
            currency: this.#currency,
            rate: this.#rate,
          })
        : state === View.MONTHLY
        ? MonthlyView({
            monthlyTotal: this.#data.thisMonth,
            monthlyTax: this.#data.monthlyTax,
            taxRate: this.#data.taxRate,
            completedMonths: this.#data.completedMonths,
            valuableStoryId: this.#data.monthlyValuableStoryId,
            currency: this.#currency,
            rate: this.#rate,
          })
        : null

    setTimeout(
      () => {
        this.#root.appendChild(view)
        this.#root.children[0].style.animation = "fade-in ease-out 150ms forwards"
        this.#setEventHandlers(state)
      },
      state === View.LOADING ? 0 : this.#duration
    )
  }

  #removeView(state) {
    if (state == View.LOADING) {
      setTimeout(() => {
        const report = document.querySelector("#report")
        const loadingText = document.getElementById("loading-text")
        const spinners = document.querySelectorAll(".spinner")
        report.classList.remove("visible")
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

        report.classList.remove("visible")
      }, 0)

      setTimeout(() => this.#root.removeChild(this.#root.children[0]), this.#duration)
    } else {
      this.#root.children[0].style.animation = "fade-out ease-out 150ms forwards"

      setTimeout(() => {
        this.#removeEventHandlers(state)
        this.#root.removeChild(this.#root.children[0])
      }, 150)
    }
  }

  #setEventHandlers(state) {
    if (state === View.DAILY) {
      const switchButton = document.querySelector("#monthly-button")
      const currencySelect = document.querySelector(".custom-select")
      const currencyOptions = document.querySelector(".custom-select > .options")

      const currencies = document.querySelectorAll(".custom-select > .options > .option")

      const isOptionsVisible = () => currencyOptions.classList.contains("visible")

      switchButton.addEventListener("click", () => this.setState(View.MONTHLY))

      addEventListener("click", e => {
        if (isOptionsVisible() && !currencyOptions.contains(e.target)) currencyOptions.classList.remove("visible")

        if (!isOptionsVisible() && currencySelect.contains(e.target)) currencyOptions.classList.add("visible")

        currencies.forEach(currency => {
          if (currency.contains(e.target)) {
            currencyOptions.classList.remove("visible")
            this.#updateCurrency(e.target.innerText)
          }
        })
      })
    } else if (state === View.MONTHLY) {
      const switchButton = document.querySelector("#daily-button")
      switchButton.addEventListener("click", () => this.setState(View.DAILY))
    } else if (state === View.LOADING) {
      const report = document.querySelector("#report")
      const reportButton = document.querySelector("#report-button")
      this.#report.timer = setTimeout(() => report.classList.add("visible"), this.#report.timeout)

      reportButton.addEventListener("click", () => {
        this.setState(View.REPORT)
        this.#sendReport()
      })
    }
  }

  #removeEventHandlers(state) {
    if (state === View.DAILY) {
      const switchButton = document.querySelector("#monthly-button")
      switchButton.removeEventListener("click", () => this.setState(View.MONTHLY))
    } else if (state === View.MONTHLY) {
      const switchButton = document.querySelector("#daily-button")
      switchButton.removeEventListener("click", () => this.setState(View.DAILY))
    } else if (state === View.LOADING) {
      const reportButton = document.querySelector("#report-button")
      clearTimeout(this.#report.timer)

      reportButton.removeEventListener("click", () => {
        this.setState(View.REPORT)
        this.#sendReport()
      })
    }
  }

  #sendReport() {
    this.#report.isReported = true
    chrome.runtime.sendMessage({
      report: true,
    })
  }
}

export default App
