export default function createRes(success, message, data = null) {
  const response = {
    success: Boolean(success),
    message: String(message)
  }
  if (data !== null && data !== undefined) response.data = data
  return response
}