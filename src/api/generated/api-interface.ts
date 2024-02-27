import { AuthApi } from './api'
import axios from 'axios'
import { Configuration } from './configuration'
import { useUserStore } from '@store/UserState'
  
const config = new Configuration()
const BASE_PATH_URL = process.env.EXPO_PUBLIC_API_URL;
const axiosInstance = axios.create({
  baseURL: BASE_PATH_URL, 
  headers: {
    'Content-Type': 'application/json',
    'Device-Id': 'android', 
    'Provided-Device-Id': 'mobile', 
  },
});
 
console.log('BASE_PATH_URL api interface', BASE_PATH_URL)
const authApi = new AuthApi(config, BASE_PATH_URL, axiosInstance)

axiosInstance.interceptors.request.use((config) => {
  
  if (!config.url.endsWith('/api/v1/auth/login')) {
    const token = useUserStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

 

axiosInstance.interceptors.request.use((config) => {
  const token = useUserStore.getState().token
  config.headers['Authorization'] = `Bearer ${token}`
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export {
  authApi,
  
}
