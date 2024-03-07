import axios, { AxiosRequestConfig } from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const httpClient = axios.create({
  baseURL: apiBaseUrl,
});

interface ApiClient {
  get: <T>(url: string, params?: AxiosRequestConfig['params']) => Promise<T>;
}

const apiClient: ApiClient = {
  get: async <T>(url: string, params?: AxiosRequestConfig['params']) => {
    const response = await httpClient.get<T>(url, { params });
    return response.data;
  },
};

export default apiClient;
