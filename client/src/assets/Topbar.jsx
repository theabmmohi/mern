import { Toolbar } from "@mui/material"

export default function Topbar() {
  return(
    <Toolbar>
      {import.meta.env.VITE_APP_NAME}
    </Toolbar>
  )
}