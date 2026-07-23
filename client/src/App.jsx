/* eslint-disable react-refresh/only-export-components */
import { ThemeProvider, CssBaseline, Stack, AppBar, Divider, Snackbar, Slide } from "@mui/material"
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
  //  App Theme
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
  //  App Toast
  const [, setSnackQueue] = useState([])
  const [currentSnack, setCurrentSnack] = useState(undefined)
  const [open, setOpen] = useState(false)
  const toast = (message) => {
    const item = { message, key: Date.now() }
    if (currentSnack) setSnackQueue((prev) => [...prev, item])
    else {
      setCurrentSnack(item)
      setOpen(true)
    }
  }
  const handleSnackExited = () => {
    setSnackQueue((prev) => {
      if (prev.length) {
        setCurrentSnack(prev[0])
        setOpen(true)
        return prev.slice(1)
      }
      setCurrentSnack(undefined)
      return prev
    })
  }
  const handleSnackClose = () => setOpen(false)
  //  App Return
  return(
    <AppContext.Provider value={{ applyTheme, toast }}>
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
          <Snackbar key={currentSnack?.key} open={open} onClose={handleSnackClose} message={currentSnack?.message} autoHideDuration={currentSnack ? Math.max(2500, currentSnack.message.length * 100) : 2500} slots={{ transition: Slide }} slotProps={{ transition: { onExited: handleSnackExited } }} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}/>
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