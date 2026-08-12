import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import App from "@/App"
import "@css/App.css"

createRoot(document.getElementById("client")).render(
  <StrictMode>
    <App/>
  </StrictMode>
)