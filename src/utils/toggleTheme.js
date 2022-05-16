const toggleTheme = currentTheme => {
  document.body.classList.contains("dark") ? document.body.classList.remove("dark") : document.body.classList.add("dark")

  return currentTheme === "dark" ? "light" : "dark"
}

export default toggleTheme
