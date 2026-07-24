import { Toolbar, Chip, Stack, Avatar, Button } from "@mui/material"
import { LuWallet, LuLogIn } from "react-icons/lu"



const user = { balance: 14895.85 }



export default function Topbar() {
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
        <Button variant="contained" startIcon={<LuLogIn/>}>Log in</Button>
      </>)}
    </Toolbar>
  )
}