import App from "./src/App"

const rootEl = document.getElementById("root")

const app = new App(rootEl)
app.setVersion(process.env.VERSION)
