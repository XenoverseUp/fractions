import express from "express"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import { v4 } from "uuid"
import { GoogleDriveService } from "./googleDriveService.mjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (_, response) => {
  response.json({ message: "I am up bithcessss!!!" })
})

app.post("/log", async (request, response) => {
  const log = request.body
  const id = v4()
  const googleDriveServices = new GoogleDriveService(
    process.env.GOOGLE_DRIVE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    process.env.GOOGLE_DRIVE_REDIRECT_URI,
    process.env.GOOGLE_DRIVE_REFRESH_TOKEN
  )

  const filePath = path.resolve(__dirname, `temp/${id}.json`)
  const folderName = "Fractions Logs"

  fs.writeFile(filePath, JSON.stringify(log), err => {
    if (err) return response.status(500).send({ err })
  })

  let folder = await googleDriveServices.searchFolder(folderName).catch(error => {
    console.error(error)
    return null
  })

  if (!folder) {
    folder = await googleDriveServices.createFolder(folderName)
  }

  await googleDriveServices.saveFile(`${id}.json`, filePath, "application/json", folder.id)

  fs.unlinkSync(filePath)

  response.status(200).json({ message: "Ok 👍!" })
})

export default app
