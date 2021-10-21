import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: 'https://25.1.175.3:8443',
});

export default api;