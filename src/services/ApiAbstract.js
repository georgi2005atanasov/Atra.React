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
        return `${this.controllerName}/${endpoint}`;
    }

    execute = async ({
        endpoint,
        method,
        body = {},
        isAuthorized = true,
    }) => {
        try {
            const url = this.#getEndpointUrl(endpoint);
            const config = {
                method,
                url,
                data: method !== METHOD.GET ? body : undefined,
            };

            if (isAuthorized) {
                const accessToken = Storage.getAccessToken();

                if (!accessToken) {
                    throw new Error("Невалидни данни за оторизация!");
                }
                
                config.headers = {
                    'Authorization': `Bearer ${accessToken}`
                };
            }

            // Special handling for logout
            if (endpoint.toLowerCase() === 'logout') {
                try {
                    await this.axiosInstance(config);
                    Storage.setAccessToken("");
                    return { success: true };
                } catch {
                    // Even if there's an error, clear the token and return success
                    Storage.setAccessToken("");
                    return { success: true };
                }
            }

            // Normal request handling for non-logout requests
            const response = await this.axiosInstance(config);
            return response.data;
            
        } catch (error) {
            if (error.response?.status === 401) {
                Storage.setAccessToken("");
                throw new AtraError(error.response.data, error.response.status);
            }
            throw error;
        }
    }
}

export default ApiAbstract;