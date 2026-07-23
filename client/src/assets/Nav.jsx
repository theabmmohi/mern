import { LuHouse, LuSwords, LuGamepad, LuUser } from "react-icons/lu"
import { Link, useLocation } from "react-router-dom"
import { Tabs, Tab } from "@mui/material"

export default function Nav() {
  const location = useLocation()
  return(
    <Tabs variant="fullWidth" value={"/" + location.pathname.split("/")[1]} slotProps={{ indicator: { sx: { top: 0 } } }}>
      <Tab component={Link} value="/home"    to="/home"    icon={<LuHouse   size="1.5rem"/>}/>
      <Tab component={Link} value="/results" to="/results" icon={<LuSwords  size="1.5rem"/>}/>
      <Tab component={Link} value="/matches" to="/matches" icon={<LuGamepad size="1.5rem"/>}/>
      <Tab component={Link} value="/profile" to="/profile" icon={<LuUser    size="1.5rem"/>}/>
    </Tabs>
  )
}