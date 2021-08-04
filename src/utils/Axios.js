import axios from 'axios';

import { createBrowserHistory } from 'history'; // or createBrowserHistory
import BASE_URL from './BASE_URL';

import { persistor } from './store';

const history = createBrowserHistory({
  basename: '/',
  forceRefresh: true,
});

const signal = axios.CancelToken.source();

const Instance = () => {
  const instance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: { Authorization: localStorage.getItem('token') },
    cancelToken: signal.token,
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log(error.response);
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          localStorage.removeItem('persist:root');
          persistor.purge();
          history.push('/');
          break;

        default:
          console.log('From Interceptor');
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default Instance;
