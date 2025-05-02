import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Intercept request to add JWT token in headers
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axios;
