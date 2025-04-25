import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to request
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("admin_token")
      window.location.href = "/admin/login"
    }
    return Promise.reject(error)
  },
)

// Public auth call
export const authAPI = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
}

// Protected admin APIs
export const adminProductsAPI = {
  getAll: () => api.get("/admin/products"),
  getById: (id: string) => api.get(`/admin/products/${id}`),
  create: (data: any) => api.post("/admin/products", data),
  update: (id: string, data: any) => api.put(`/admin/products/${id}`, data),
  delete: (id: string) => api.delete(`/admin/products/${id}`),
}

// Image upload with correct field name "image"
export const uploadAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData()
    formData.append("image", file) // ✅ MUST match multer field name

    return api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
}

export default api
