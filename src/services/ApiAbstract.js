import AtraError from "../AtraError.js";
import { API_BASE_URL } from "../utils/appConstants.js";
import Storage from "../utils/storage/Storage.js";

export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

class ApiAbstract {
    controllerName;

    #getEndpointUrl = (endpoint) => {
        return `${API_BASE_URL}/${this.controllerName}/${endpoint}`;
    }

    execute = async ({
        endpoint,
        method,
        body = {},
        isAuthorized = true,
    }) => {
        const url = this.#getEndpointUrl(endpoint);
        const headers = {
            'Content-Type': 'application/json',
        };

        if (isAuthorized) {
            const accessToken = await Storage.getAccessToken();

            if (!accessToken) {
                throw new Error("Невалидни данни за оторизация!");
            }
            
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const options = {
            method,
            headers,
            body: method !== METHOD.GET ? JSON.stringify(body) : undefined,
        };

        const response = await fetch(url, options);

        if (response.status === 401) {
            Storage.setAccessToken("");
            throw new AtraError(response.text, response.status);
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        return data;
    }
}

export default ApiAbstract;