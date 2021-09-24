import axios from "axios";

const api = axios.create({
    baseURL: 'https://3693-168-181-51-64.ngrok.io/'
});

export default api;