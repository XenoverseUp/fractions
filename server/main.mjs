import server from "./server.mjs"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log(`Server is up and runnning on port ${PORT}...`))
