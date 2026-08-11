export default function createRes(success = false, message = "Something went wrong. Please try again in a moment.", data = null) {
  const response = {
    success: Boolean(success),
    message: String(message)
  }
  if (data !== null && data !== undefined) response.data = data
  return response
}