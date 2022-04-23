import axios from 'axios';
const token = localStorage.getItem('token');
export const HTTP = axios.create({
  baseURL: `http://192.168.1.16:8080`,
  headers: {
    Authorization: `Bearer ${token}`
  }
})
