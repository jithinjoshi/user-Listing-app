import axios from "axios";
import store  from "../redux/store";
import { addAccessTokenToken } from "../redux/appSlice";

const authApi = axios.create({ baseURL: 'http://localhost:7000/api/', withCredentials: true });

authApi.interceptors.request.use(
    (config) => {
      const accessToken = store.getState().app.accessToken;
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
  )
  
  authApi.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        try {
          const response = await axios.get('http://localhost:7000/api/auth/refresh', { withCredentials: true });
          const accessToken = response.data.accessToken
          store.dispatch(addAccessTokenToken(accessToken));
  
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return authApi(originalRequest)
        } catch (error) {
          return error;
        }
      }
    }
  )
  export default authApi;
