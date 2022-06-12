import Theme, { negate } from "e/Theme"
import bodyHasClass from "_/bodyHasClass"

const themeUtils = {
  set: t => localStorage.setItem("fractions-theme-1881", t.toString()),
  get: () =>
    localStorage.getItem("fractions-theme-1881") === "Symbol(DARK)"
      ? Theme.DARK
      : localStorage.getItem("fractions-theme-1881") === "Symbol(LIGHT)"
      ? Theme.LIGHT
      : null,
}

class ThemeHandler {
  theme = Theme.LIGHT

  init() {
    if (themeUtils.get()) {
      this.theme = themeUtils.get()
      this.#setTheme(themeUtils.get())
    }
  }

  #setTheme(theme) {
    if (theme === Theme.LIGHT && bodyHasClass("dark")) document.body.classList.remove("dark")
    else if (theme === Theme.DARK && !bodyHasClass("dark")) document.body.classList.add("dark")

    this.theme = theme
  }

  setEventListeners() {
    const themeButtons = document.querySelectorAll("[data-toggle-theme]")
    themeButtons.forEach(button =>
      button.addEventListener("click", () => {
        const negated = negate(this.theme)

        this.#setTheme(negated)
        themeUtils.set(negated)
      })
    )
  }
}

export default ThemeHandler
