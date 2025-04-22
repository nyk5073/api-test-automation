import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * API Client for making HTTP requests
 */
class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  /**
   * Creates an instance of ApiClient.
   * Automatically initializes the auth token from environment variables if available.
   * 
   * @param {string} [baseURL] - Optional base URL to override environment setting
   * @param {string} [token] - Optional token to override environment setting
   */
  constructor(baseURL?: string, token?: string) {
    // Initialize token from parameter or environment variable
    this.token = token || process.env.AUTH_TOKEN || null;
    
    // Create axios instance
    this.client = axios.create({
      baseURL: baseURL || process.env.API_BASE_URL,
      timeout: Number(process.env.TEST_TIMEOUT) || 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor for adding auth token
    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        this.logResponse(response);
        return response;
      },
      (error) => {
        if (error.response) {
          this.logResponse(error.response);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Set authentication token
   * Use this method to update the token at runtime (e.g., after login)
   * 
   * @param {string} token - Authentication token
   * @returns {ApiClient} - Returns this instance for method chaining
   */
  setToken(token: string): ApiClient {
    this.token = token;
    return this;
  }

  /**
   * Clear authentication token
   * 
   * @returns {ApiClient} - Returns this instance for method chaining
   */
  clearToken(): ApiClient {
    this.token = null;
    return this;
  }

  /**
   * Get current authentication token
   * 
   * @returns {string|null} - Current token or null if not set
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Make GET request
   */
  async get<T = any>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(path, config);
  }

  /**
   * Make POST request
   */
  async post<T = any>(path: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(path, data, config);
  }

  /**
   * Make PUT request
   */
  async put<T = any>(path: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(path, data, config);
  }

  /**
   * Make DELETE request
   */
  async delete<T = any>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(path, config);
  }

  /**
   * Make PATCH request
   */
  async patch<T = any>(path: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(path, data, config);
  }

  /**
   * Log API response for debugging
   */
  private logResponse(response: AxiosResponse): void {
    console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    if (process.env.NODE_ENV === 'development') {
      console.log('Response:', JSON.stringify(response.data, null, 2));
    }
  }
}

// Export singleton instance
// The token will be automatically initialized from AUTH_TOKEN environment variable
export const apiClient = new ApiClient();

// Export class for creating custom instances
export default ApiClient;

