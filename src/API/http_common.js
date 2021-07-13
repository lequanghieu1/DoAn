import axios from 'axios';
const token = localStorage.getItem('token');
export const HTTP = axios.create({
  baseURL: `https://freeapi.code4func.com/api/v1`,
  headers: {
    Authorization: `Bearer ${token}`
  }
})