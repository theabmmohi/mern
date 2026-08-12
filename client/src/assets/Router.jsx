import { Routes, Route, Navigate } from "react-router-dom"
import { Suspense } from "react"
import { tabs } from "@js/Tab"


export default function Router() {
  return <Suspense>
    <Routes>
      <Route path="/*" element={<Navigate to={tabs[0].path} replace/>}/>
      {tabs.map(({path, Page}) =>
        <Route key={path} path={`${path}/*`} element={<Page/>}/>
      )}
    </Routes>
  </Suspense>
}