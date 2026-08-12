import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Tabs, Tab } from "@mui/material"
import { tabs } from "@js/Tab"
const tabPaths = tabs.map(t => t.path)
export default function Nav() {
  const location = useLocation()
  const segment = "/" + location.pathname.split("/")[1]
  const isValidTab = tabPaths.includes(segment)
  const value = isValidTab ? segment : false
  const prevWasValid = useRef(isValidTab)
  const [instant, setInstant] = useState(false)
  useEffect(() => {
    if (prevWasValid.current !== isValidTab) setInstant(true)
    prevWasValid.current = isValidTab
  }, [isValidTab])
  useEffect(() => {
    if (!instant) return
    const id = requestAnimationFrame(() => setInstant(false))
    return () => cancelAnimationFrame(id)
  }, [instant])
  return <Tabs variant="fullWidth" value={value} slotProps={{ indicator: { sx: { top: 0, opacity: value === false ? 0 : 1, transition: instant ? "opacity 200ms ease" : "left 300ms cubic-bezier(0.4,0,0.2,1), width 300ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease" } } }}>
    {tabs.map(({ path, icon: Icon }) => (<Tab key={path} component={Link} value={path} to={path} icon={<Icon size="1.5rem" />} />))}
  </Tabs>
}