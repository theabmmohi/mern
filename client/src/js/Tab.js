export const toRoutes = (path) => path.slice(1).split("-").map(seg => seg.charAt(0).toUpperCase() + seg.slice(1)).join("")
import { LuHouse, LuUser } from "react-icons/lu"
export const tabs = [
  { path: "/home", icon: LuHouse },
  { path: "/user", icon: LuUser  }
]