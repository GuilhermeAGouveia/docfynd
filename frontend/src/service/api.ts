import axios from "axios";
import { headers } from "next/dist/client/components/headers";

const api = axios.create({
    baseURL: process.env.BACKEND_URL || "http://localhost:8080/v1",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
})

export default api