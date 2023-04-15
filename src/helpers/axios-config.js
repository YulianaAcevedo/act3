import axios from 'axios';

const axiosInstance =axios.create({
    //baseURL: 'http://localhost:3003/'
    baseURL: 'https://inventario-b.onrender.com'
});

export {
    axiosInstance,
}