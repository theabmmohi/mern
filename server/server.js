import mongoSanitize from "@exortek/express-mongo-sanitize"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"

const server = express()
const port = process.env.SERVER_PORT
server.use(helmet())
server.use(morgan(process.env.NODE_ENV === "dev" ? "dev" : "combined"))
server.use(cors({ origin: process.env.APP_CLIENT, credentials: true }))
server.use(express.json())
server.use(mongoSanitize())
server.use(cookieParser())

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("Database connected.")
  server.listen(port, () => console.log(`Server started on port ${port}.`))
})
.catch((error) => {
  console.error("Database connection error: ", error)
  process.exit(1)
})
server.all("/", (_, res) => res.type("text").send("Im Alive!"))

