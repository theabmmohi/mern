import dotenvExpand from "dotenv-expand"
import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenvExpand.expand(dotenv.config({ path: "../.env", quiet: true }))
const server = express()
const port = 8000
server.use(cors())
server.use(express.json())
mongoose.connect(process.env.MONGODB)
.then(() => {
  console.log("Database connected.")
  server.listen(port, () => console.log(`Server started on port ${port}.`))
})
.catch((error) => {
  console.error("Database connection error: ", error)
  process.exit(1)
})
server.all("/", (_, res) => res.type("text").send("Im Alive!"))

