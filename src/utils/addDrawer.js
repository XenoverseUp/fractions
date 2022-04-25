import Drawer from "c/Drawer"
import toggleDrawer from "_/toggleDrawer"

const addDrawer = () => {
  const { body } = document

  body.appendChild(Drawer())
}

export default addDrawer
