import axios from "axios";
import AtraError from "../AtraError.js";
import { API_BASE_URL } from "../utils/appConstants.js";
import Storage from "../utils/storage/Storage.js";

export const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

class ApiAbstract {
  controllerName;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  #getEndpointUrl = (endpoint) => {
    return `${this.controllerName.trim("/")}/${endpoint.trim("/")}`;
  }

  execute = async ({
    endpoint,
    method,
    body = {},
    isAuthorized = true,
  }) => {
    try {
      const url = this.#getEndpointUrl(endpoint);
      const isFormData = body instanceof FormData;
      const config = {
        method,
        url,
        data: method !== METHOD.GET ? body : undefined,
        headers: {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        },
      };

      if (isAuthorized) {
        const accessToken = Storage.getAccessToken();

        if (!accessToken) {
          throw new Error("Невалидни данни за оторизация!");
        }

        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      // Special handling for logout
      if (endpoint.toLowerCase() === 'logout') {
        try {
          await this.axiosInstance(config);
          return { success: true };
        } catch {
          return { success: true };
        }
      }

      const response = await this.axiosInstance(config);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new AtraError(error.response.data, error.response.status);
      }
      throw error;
    }
  }
}

export default ApiAbstract;
