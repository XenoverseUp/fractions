const toggleDrawer = () => {
  const drawer = document.getElementById("drawer")
  const open = drawer.classList.contains("active")

  if (open) drawer.classList.remove("active")
  else drawer.classList.add("active")
}

export default toggleDrawer
