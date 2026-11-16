import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
const SANCTUM_URL: string =
  process.env.NEXT_PUBLIC_SANCTUM_URL || "http://localhost:8000";

const AUTH_TOKEN_KEY = "access_token";
const LOGIN_PATH = "/auth-crud/login";

/**
 * Centralized Axios client untuk seluruh API calls.
 * Semua halaman CRUD WAJIB menggunakan client ini — JANGAN hardcode URL.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Request interceptor — inject Bearer token dari localStorage.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError): Promise<never> => Promise.reject(error),
);

/**
 * Response interceptor — handle 401 Unauthorized secara global.
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<never> => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);

      if (!window.location.pathname.includes(LOGIN_PATH)) {
        window.location.href = LOGIN_PATH;
      }
    }
    return Promise.reject(error);
  },
);

/**
 * Helper: Fetch CSRF cookie dari Laravel Sanctum.
 * Panggil sebelum POST/PUT/DELETE yang memerlukan CSRF protection.
 *
 * @example
 * await fetchCsrfCookie();
 * await apiClient.post('/article', data);
 */
export const fetchCsrfCookie = async (): Promise<void> => {
  await axios.get(`${SANCTUM_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};

export { AUTH_TOKEN_KEY, API_BASE_URL, SANCTUM_URL };
export default apiClient;
