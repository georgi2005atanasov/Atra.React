import { API_BASE_URL } from "../utils/appConstants.js";

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
            const accessToken = await SecureStorage.getAccessToken();
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }

        const options = {
            method,
            headers,
            body: method !== METHOD.GET ? JSON.stringify(body) : undefined,
        };

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
}

export default ApiAbstract;