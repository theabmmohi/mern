import axios from "axios"

let refreshPromise = null
let accessToken = null
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER,
  withCredentials: true
})

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

api.interceptors.response.use(async (res) => {
  if (res.data?.success === false && res.data?.message === "Access token expired." && !res.config._retried) {
    res.config._retried = true
    if (!refreshPromise) {
      refreshPromise = api.post("/auth/refresh")
        .then((r) => { setAccessToken(r.data?.data?.accessToken ?? null); return getAccessToken() })
        .finally(() => { refreshPromise = null })
    }
    const newToken = await refreshPromise
    if (!newToken) return res
    res.config.headers.Authorization = `Bearer ${newToken}`
    return api(res.config)
  }
  return res
})

export const setAccessToken = (token) => { accessToken = token }
export const getAccessToken = () => accessToken
export { api }