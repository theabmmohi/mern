import { CircularProgress, FormControl, Typography, IconButton, TextField, Button, Stack, Box } from "@mui/material"
import { LuEye, LuEyeOff } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { AppContext } from "@/App"

export default function Auth() {
  const navigate = useNavigate()
  const { toast, setAccessToken, api } = useContext(AppContext)
  const [isSignUp, setIsSignUp] = useState(false)
  const [username, setUsername] = useState("")
  const [identifier, setIdentifier] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    if (isSignUp && !username) return toast("Username required.")
    if (isSignUp && !email) return toast("Email required.")
    if (!isSignUp && !identifier) return toast("Username or email required.")
    if (!password) return toast("Password required.")
    setSubmitting(true)
    try {
      const { data: result } = await api.post(`/auth/${isSignUp ? "register" : "login"}`, isSignUp ? { username, email, password } : { identifier, password })
      toast(result.message)
      if (result.success) {
        setAccessToken(result.data.accessToken)
        navigate("/home")
      }
    } catch (error) { toast(error?.message ??"Something went wrong.") } finally { setSubmitting(false) }
  }
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 5 }}>
      <Typography variant="h5" sx={{ textAlign: "center", my: 2.5 }}>{isSignUp ? "Create Account" : "Sign In"}</Typography>
      <FormControl component="form" onSubmit={handleSubmit} sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
        {isSignUp && (<TextField fullWidth size="small" label="Username" value={username} onChange={e => setUsername(e.target.value)}/>)}
        {isSignUp
          ? (<TextField fullWidth size="small" label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>)
          : (<TextField fullWidth size="small" label="Username or Email" value={identifier} onChange={e => setIdentifier(e.target.value)}/>)}
        <TextField fullWidth size="small" label="Password" type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} slotProps={{ input: { endAdornment: (<IconButton size="small" onClick={() => setShowPass(!showPass)}>{showPass ? <LuEye/> : <LuEyeOff/>}</IconButton>) } }}/>
        <Stack direction="row" sx={{ width: "100%", justifyContent: "space-between" }}>
          <Button>Forgot password?</Button>
          <Button onClick={() => { setIsSignUp(!isSignUp); setPassword("") }}>{isSignUp ? "Sign in instead" : "Create account"}</Button>
        </Stack>
        <Button disableElevation sx={{ width: "75%" }} type="submit" disabled={submitting} variant={submitting ? "outlined" : "contained"} startIcon={submitting ? <CircularProgress size={14}/> : null}>
          {submitting ? (isSignUp ? "Signing up..." : "Signing in...") : (isSignUp ? "Sign Up" : "Sign In")}
        </Button>
      </FormControl>
    </Box>
  )
}