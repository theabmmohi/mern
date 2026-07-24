import mongoSanitize from "express-mongo-sanitize"
import cookieParser from "cookie-parser"
import dotenvExpand from "dotenv-expand"
import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"

dotenvExpand.expand(dotenv.config({ path: "../.env", quiet: true }))
const server = express()
const port = 8000
server.use(helmet())
server.use(morgan(process.env.NODE_ENV === "prod" ? "combined" : "dev"))
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

import auth from "#route/auth"
server.use("/auth", auth)

