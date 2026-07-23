/* eslint-disable react-refresh/only-export-components */
import { ThemeProvider, CssBaseline, Stack, AppBar, Divider } from "@mui/material"
import { StrictMode, useEffect, useState, createContext } from "react"
import { BrowserRouter } from "react-router-dom"
import { createRoot } from "react-dom/client"
import "@/App.css"

import { themeL, themeD } from "@/Theme"
import Topbar from "@asset/Topbar"
import Router from "@asset/Router"
import Nav from "@asset/Nav"

export const AppContext = createContext(null)

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
    <AppContext.Provider value={{ applyTheme }}>
      <ThemeProvider theme={isDark ? themeD : themeL}>
        <CssBaseline/>
        <BrowserRouter>
          <Stack sx={{ height: "100svh", width: "100svw" }}>
            <AppBar position="sticky" elevation={0} color="default">
              <Topbar/>
            </AppBar>
            <Divider/>
            <Stack sx={{ overflowY: "auto", flex: 1 }}>
              <Router/>
            </Stack>
            <Divider/>
            <AppBar position="sticky" elevation={0} color="default">
              <Nav/>
            </AppBar>
          </Stack>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  )
}

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <App/>
  </StrictMode>
)