import axios from "axios";
const api = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  baseURL: "http://localhost:5173",
});
export default api;
