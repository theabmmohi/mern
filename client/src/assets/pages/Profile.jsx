import { Stack, Typography, Button, ButtonBase, Divider } from "@mui/material"
import { LuLogOut, LuUser, LuShieldCheck, LuChevronRight } from "react-icons/lu"

export default function Profile() {
  return(<>
    <Stack sx={{ alignItems: "center" }}>
      <Typography variant="h5">Profile</Typography>
      <Typography variant="caption">
        Manage your {import.meta.env.VITE_APP_NAME} account
      </Typography>
    </Stack>
    <Stack sx={{ border: "1px solid", borderColor: "divider", overflow: "auto", borderRadius: 1 }}>
      <ButtonBase sx={{ gap: 2, p: 2 }}>
        <LuUser size="1.5rem"/>
        <Typography sx={{ flex: 1, textAlign: "left" }}>Account</Typography>
        <LuChevronRight size="1.5rem"/>
      </ButtonBase>
      <Divider/>
      <ButtonBase sx={{ gap: 2, p: 2 }}>
        <LuShieldCheck size="1.5rem"/>
        <Typography sx={{ flex: 1, textAlign: "left" }}>Security</Typography>
        <LuChevronRight size="1.5rem"/>
      </ButtonBase>
    </Stack>
    <Button variant="outlined" startIcon={<LuLogOut/>} sx={{ mt: "auto" }}>Log out</Button>
  </>)
}