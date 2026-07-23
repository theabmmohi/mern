import { createTheme } from "@mui/material"
import * as colors from "@mui/material/colors"
const colorName = import.meta.env.VITE_APP_THEME
const family = colors[colorName] || colors.orange

const base = {
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600
        }
      }
    }
  }
}

export const themeL = createTheme({
  ...base,
  palette: {
    mode: "light",
    primary: { main: family[700] },
    secondary: { main: family[400] },
    text: {
      primary: colors.grey[900],
      secondary: colors.grey[600]
    },
    background: {
      default: family[50],
      paper: colors.common.white
    }
  }
})

export const themeD = createTheme({
  ...base,
  palette: {
    mode: "dark",
    primary: { main: colors.common.white },
    secondary: { main: colors.grey[500] },
    text: {
      primary: colors.common.white,
      secondary: colors.grey[500]
    },
    background: {
      default: colors.grey[900],
      paper: colors.grey[800]
    }
  }
})