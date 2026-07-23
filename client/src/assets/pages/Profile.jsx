import { LuLogOut, LuUser, LuShieldCheck, LuChevronRight } from "react-icons/lu"
import { Stack, Typography, Button, ButtonBase, Divider } from "@mui/material"
import { Link, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"

const Account  = lazy(() =>  import("@page/profile/Account"))
const Security = lazy(() => import("@page/profile/Security"))

function Self() {
  return(<>
    <Stack sx={{ alignItems: "center" }}>
      <Typography variant="h5">Profile</Typography>
      <Typography variant="caption">
        Manage your {import.meta.env.VITE_APP_NAME} account
      </Typography>
    </Stack>
    <Stack sx={{ border: "1px solid", borderColor: "divider", overflow: "auto", borderRadius: 1 }}>
      <ButtonBase component={Link} to="account" sx={{ gap: 2, p: 2 }}>
        <LuUser size="1.5rem"/>
        <Typography sx={{ flex: 1, textAlign: "left" }}>Account</Typography>
        <LuChevronRight size="1.5rem"/>
      </ButtonBase>
      <Divider/>
      <ButtonBase component={Link} to="security" sx={{ gap: 2, p: 2 }}>
        <LuShieldCheck size="1.5rem"/>
        <Typography sx={{ flex: 1, textAlign: "left" }}>Security</Typography>
        <LuChevronRight size="1.5rem"/>
      </ButtonBase>
    </Stack>
    <Button variant="outlined" startIcon={<LuLogOut/>} sx={{ mt: "auto", py: 1 }}>Log out</Button>
  </>)
}

export default function Profile() {
  return(
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route index element={<Self/>}/>
        <Route path="account" element={<Account/>}/>
        <Route path="security" element={<Security/>}/>
      </Routes>
    </Suspense>
  )
}