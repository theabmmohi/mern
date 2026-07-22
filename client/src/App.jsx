/* eslint-disable react-refresh/only-export-components */
import { ThemeProvider, CssBaseline } from "@mui/material"
import { StrictMode, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import "@/App.css"

import { themeL, themeD } from "@/Theme"

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("AppTheme") || "system")
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches)
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e) => setSystemPrefersDark(e.matches)
    mql.addEventListener("change", handleChange)
    mql.addListener?.(handleChange)
    return () => {
      mql.removeEventListener("change", handleChange)
      mql.removeListener?.(handleChange)
    }
  }, [])
  const isDark = theme === "dark" || (theme === "system" && systemPrefersDark)
  const applyTheme = (newTheme) => {
    localStorage.setItem("AppTheme", newTheme)
    setTheme(newTheme)
  }
  return(
    <ThemeProvider theme={isDark ? themeD : themeL}>
      <CssBaseline/>
    </ThemeProvider>
  )
}

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <App/>
  </StrictMode>
)