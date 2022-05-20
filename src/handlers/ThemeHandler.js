import Theme from "../enums/Theme"
import theme from "_/theme"

class ThemeHandler {
  theme

  init() {
    if (theme.get()) {
      this.#theme = theme.get()
      this.#setTheme(theme.get())
    } else {
      this.#theme = Theme.LIGHT
      theme.set(Theme.LIGHT)
    }
  }

  activate() {}

  #setTheme(theme) {
    if (theme === Theme.LIGHT && bodyHasClass("dark")) {
      document.body.classList.remove("dark")
      this.#theme = Theme.LIGHT
    } else if (theme === Theme.DARK && !bodyHasClass("dark")) {
      document.body.classList.add("dark")
      this.#theme = Theme.DARK
    }
  }

  #setEventHandlers() {}
}

export default ThemeHandler
