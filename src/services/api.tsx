import axios from "axios";

const api = axios.create({
    baseURL: 'https://26.141.51.143:8443'
});

export default api;