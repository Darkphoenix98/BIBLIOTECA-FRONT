import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:'https://blioteca-iud.onrender.com/'
});

export {
    axiosInstance,
}