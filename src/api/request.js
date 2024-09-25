import axios from "axios";
const client = axios.create({ baseURL: "https://api.dev1.gomaplus.tech/api" });
client.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('arhebo-token')
      window.location.href = '/';
    }
  });
export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('arhebo-token')}`;
  return client(options).then((res) => res);
};
