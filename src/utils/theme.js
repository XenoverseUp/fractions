import Theme from "../enums/Theme"

const theme = {
  set: t => localStorage.setItem("fractions-theme-1881", t.toString()),
  get: () =>
    localStorage.getItem("fractions-theme-1881") === "Symbol(DARK)"
      ? Theme.DARK
      : localStorage.getItem("fractions-theme-1881") === "Symbol(LIGHT)"
      ? Theme.LIGHT
      : null,
}

export default theme
