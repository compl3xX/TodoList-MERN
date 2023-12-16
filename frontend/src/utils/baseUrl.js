import axios from 'axios'


const api = axios.create({
    baseURL: 'https://todo-app-backend-i3mo.onrender.com',
    // You can add other configuration options here
});

export default api