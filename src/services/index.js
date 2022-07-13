import axios from "axios";

export const baseURLAPI = "http://localhost:3000/"

const api = axios.create({
    baseURL: baseURLAPI,
    headers: {
        common: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json;charset=utf-8',
        }
    },
});

export default api;