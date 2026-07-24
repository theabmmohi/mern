import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"

const Home    = lazy(() =>    import("@page/Home"))
const Auth    = lazy(() =>    import("@page/Auth"))
const Results = lazy(() => import("@page/Results"))
const Matches = lazy(() => import("@page/Matches"))
const Profile = lazy(() => import("@page/Profile"))

export default function Router() {
  return(
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/*" element={<Navigate to="/home" replace/>}/>
        <Route path="/home/*"    element={<Home   />}/>
        <Route path="/auth/*"    element={<Auth   />}/>
        <Route path="/results/*" element={<Results/>}/>
        <Route path="/matches/*" element={<Matches/>}/>
        <Route path="/profile/*" element={<Profile/>}/>
      </Routes>
    </Suspense>
  )
}