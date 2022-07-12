import axios from "axios";

export const baseURLAPI = "http://0.0.0.0:3000/"

const api = axios.create({
    baseURL: baseURLAPI,
});

export default api;