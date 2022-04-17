const express = require("express")
const app = express()

app.use(express.json())

const port = process.env.PORT || 8000

app.get("/", (_, response) => response.json("I am up bitchesssss!"))

app.post("/log", async (request, response) => {
  let data = request.body

  console.log(data)
  response.json({ message: "Ok 👍!" })
})

app.listen(port, () => console.log(`Server is up and running on PORT ${port}...`))
