// api.js

import axios from "axios"
import { useNavigate } from "react-router-dom"

const navigate = useNavigate()

const api = axios.create({
  baseURL: "https://localhost:7123/api" // Replace with your API base URL
})

// Add the interceptor to add the Bearer token to the headers
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    if (error.status === 401) {
      navigate("/", { replace: true })
    }
    return Promise.reject(error)
  }
)

export default api
