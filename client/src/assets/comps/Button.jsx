import { CircularProgress, Button as Base } from "@mui/material"

export default function Button(props) {
  const { loading = false, startIcon = null, ...rest } = props
  return (
    <Base
      startIcon={loading ? <CircularProgress size={20}/> : startIcon}
      variant={loading ? "outlined" : "contained"}
      disabled={loading}
      {...rest}
    >
      {props.children}
    </Base>
  )
}