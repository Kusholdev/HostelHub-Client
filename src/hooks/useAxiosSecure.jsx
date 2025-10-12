import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000' // ✅ your backend port
});

const useAxiosSecure = () => {
  return axiosInstance;
};

export default useAxiosSecure;
