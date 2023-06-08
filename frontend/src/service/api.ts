import axios from "axios";

const api = axios.create({
    baseURL: process.env.BACKEND_URL || "http://localhost:8080/v1"
})

export default api