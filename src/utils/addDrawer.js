import Drawer from "c/Drawer"

const addDrawer = author => {
  const { body } = document

  body.appendChild(Drawer(author))
}

export default addDrawer
