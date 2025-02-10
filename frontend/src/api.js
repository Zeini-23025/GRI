import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
  // baseURL: "http://172.20.10.2:8000", // yleyn t3a9a t3oud dor ted5el mn telefoune
  baseURL: "http://localhost:8000", //
  headers: { "Content-Type": "application/json" },
});


// Interceptor pour ajouter le token d'accès dans les en-têtes des requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor pour gérer les erreurs de réponse, notamment pour les 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Si le token d'accès est expiré, tente de rafraîchir le token
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            "http://localhost:8000/api/token/refresh/",
            { refresh: refreshToken }
          );
          // Enregistrer le nouveau token d'accès
          localStorage.setItem(ACCESS_TOKEN, refreshResponse.data.access);
          // Relancer la requête d'origine avec le nouveau token
          return api(error.config);
        } catch (err) {
          // Si le rafraîchissement échoue, supprimer les tokens et rediriger l'utilisateur
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          // Vous pouvez ajouter ici la logique pour rediriger l'utilisateur vers la page de login
        }
      }
    }
    return Promise.reject(error);
  }
);

const apiServices = {
  // Immobiliers
  immobiliers: {
    list: () => api.get('/api/immobiliers/'),
    get: (id) => api.get(`/api/immobiliers/${id}/`),
    create: (data) => api.post('/api/immobiliers/create/', data),
    update: (id, data) => api.put(`/api/immobiliers/${id}/update/`, data),
    delete: (id) => api.delete(`/api/immobiliers/${id}/delete/`),
  },

  // Types
  types: {
    list: () => api.get('/api/types/'),
    get: (id) => api.get(`/api/types/${id}/`),
    create: (data) => api.post('/api/types/create/', data),
    update: (id, data) => api.put(`/api/types/${id}/update/`, data),
    delete: (id) => api.delete(`/api/types/${id}/delete/`),
  },

  // Contrats
  contrats: {
    list: () => api.get('/api/contrats/'),
    get: (id) => api.get(`/api/contrats/${id}/`),
    create: (data) => api.post('/api/contrats/create/', data),
    update: (id, data) => api.put(`/api/contrats/${id}/update/`, data),
    delete: (id) => api.delete(`/api/contrats/${id}/delete/`),
  },

  // Paiements
  paiements: {
    list: () => api.get('/api/paiements/'),
    get: (id) => api.get(`/api/paiements/${id}/`),
    create: (data) => api.post('/api/paiements/create/', data),
    update: (id, data) => api.put(`/api/paiements/${id}/update/`, data),
    delete: (id) => api.delete(`/api/paiements/${id}/delete/`),
  },

  // Utilisateurs
  utilisateurs: {
    list: () => api.get('/api/users/'),
    get: (id) => api.get(`/api/utilisateurs/${id}/`),
    update: (id, data) => api.put(`/api/user/update/`, data),
  },
};

export { api as default, apiServices };
