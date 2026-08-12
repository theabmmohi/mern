import { LuHouse, LuUser } from "react-icons/lu"
import { lazy } from "react"

export const tabs = [
  {
    path: "/home",
    icon: LuHouse,
    Page: lazy(() => import("@page/Home"))
  },
  {
    path: "/user",
    icon: LuUser,
    Page: lazy(() => import("@page/User"))
  }
]