import { Routes, Route, Navigate } from "react-router-dom"
import { Suspense, lazy } from "react"

const Home    = lazy(() =>    import("@page/Home"))

export default function Router() {
  return <Suspense>
    <Routes>
      <Route path="/*" element={<Navigate to="/home" replace/>}/>
      <Route path="/home/*" element={<Home   />}/>
    </Routes>
  </Suspense>
}