import { Toolbar, Chip, Stack, Avatar, Button } from "@mui/material"
import { LuWallet, LuLogIn } from "react-icons/lu"
import { useNavigate } from "react-router-dom"



const user = null



export default function Topbar() {
  const navigate = useNavigate()
  return(
    <Toolbar sx={{ gap: 2.5 }}>
      <span style={{ flex: 1 }}>
        {import.meta.env.VITE_APP_NAME}
      </span>
      {user ? (<>
        <Chip label={<Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5 }}>
          <LuWallet size="1.125rem"/>
          <span>{user?.balance?.toLocaleString("bn-BD-u-nu-latn", {
            style: "currency",
            currency: import.meta.env.VITE_APP_CURRENCY,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })}</span>
        </Stack>}/>
        <Avatar/>
      </>) : (<>
        <Button variant="contained" onClick={() => navigate("/auth")} startIcon={<LuLogIn/>}>Log in</Button>
      </>)}
    </Toolbar>
  )
}