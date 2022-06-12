import Theme, { negate } from "../enums/Theme"
import themeUtils from "_/themeUtils"
import bodyHasClass from "_/bodyHasClass"

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

  setEventHandlers() {
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
