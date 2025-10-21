import axios from 'axios';
import useAuth from './useAuth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000' // your backend port
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  axiosInstance.interceptors.request.use(async (config) => {
    if (user) {
      const token = await user.getIdToken(); // get Firebase JWT
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  return axiosInstance;
};

export default useAxiosSecure;
