import Drawer from "c/Drawer"

class DrawerHandler {
  addDrawer = author => {
    document.body.appendChild(Drawer(author))
  }

  toggleDrawer = () => {
    const drawer = document.getElementById("drawer")
    const open = drawer.classList.contains("active")

    if (open) drawer.classList.remove("active")
    else drawer.classList.add("active")
  }

  setEventListeners() {
    const toggleButtons = document.querySelectorAll("[data-toggle-drawer]")
    toggleButtons.forEach(button =>
      button.addEventListener("click", () => {
        this.toggleDrawer()
      })
    )
  }
}

export default DrawerHandler
