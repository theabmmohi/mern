import { Toolbar, Chip, Stack, Avatar, Button, Skeleton } from "@mui/material"
import { LuWallet, LuLogIn } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import  Context from "@js/Context"

export default function Topbar() {
  const navigate = useNavigate()
  const user = []
  const authenticating = true
  return <Toolbar sx={{ gap: 2.5 }}>
    <span style={{ flex: 1 }}>
      {import.meta.env.VITE_APP_NAME}
    </span>
    <span>
      {authenticating
        ? <Skeleton variant="circular" width={40} height={40} animation="wave"/>
        : user
        ? <Avatar/>
        : <Button variant="contained" onClick={() => navigate("/auth")} startIcon={<LuLogIn/>}>Login</Button>
      }
    </span>
  </Toolbar>
}