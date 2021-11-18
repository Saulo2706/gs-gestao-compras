import axios from "axios";


const api = axios.create({
    withCredentials: true,
    baseURL:  process.env.baseURL,
});

export default api;