// src/api/client.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setAuthToken(token){
    /** si token existe, l'ajouter dans l'en-tête avec Bearer <token>
     * si non, supprimer l'en-tête
     */
    if (token)
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    else
        delete api.defaults.header.common.Authorization;
}

export function installUnauthorizedHandler(onUnauthorized){
    // Interceptor : gère le refresh token si 401
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            const status = error?.response?.status;

        if (status === 401)
            onUnauthorized();

        return Promise.reject(error);
  }
);
}
