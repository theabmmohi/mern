import { Routes, Route, Navigate } from "react-router-dom"
import { tabs, toRoutes } from "@js/Tab"
import { Suspense, lazy } from "react"
const routes = tabs.map(tab => ({
  path: tab.path,
  Page: lazy(() => import(`@page/${toRoutes(tab.path)}.jsx`))
}))
export default function Router() {
  return <Suspense>
    <Routes>
      <Route path="/*" element={<Navigate to={tabs[0].path} replace/>}/>
      {routes.map(({path, Page}) => <Route key={path} path={`${path}/*`} element={<Page/>}/>)}
    </Routes>
  </Suspense>
}