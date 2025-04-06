import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
  // baseURL: "http://192.168.100.14:8000", // yleyn t3a9a t3oud dor ted5el mn telefoune
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
    create: (data) => api.post('/api/immobiliers/', data),
    update: (id, data) => api.put(`/api/immobiliers/${id}`, data),
    delete: (id) => api.delete(`/api/immobiliers/${id}/`),
  },

  // Types
  types: {
    list: () => api.get('/api/types/'),
    get: (id) => api.get(`/api/types/${id}/`),
    create: (data) => api.post('/api/types/', data),
    update: (id, data) => api.put(`/api/types/${id}/`, data),
    delete: (id) => api.delete(`/api/types/${id}/`),
  },

  // Contrats
  contrats: {
    list: () => api.get('/api/contrats/'),
    get: (id) => api.get(`/api/contrats/${id}/`),
    create: (data) => api.post('/api/contrats/', data),
    update: (id, data) => api.put(`/api/contrats/${id}/`, data),
    delete: (id) => api.delete(`/api/contrats/${id}/`),
  },

  // Paiements
  paiements: {
    list: () => api.get('/api/paiements/'),
    get: (id) => api.get(`/api/paiements/${id}/`),
    create: (data) => api.post('/api/paiements/', data),
    update: (id, data) => api.put(`/api/paiements/${id}/`, data),
    delete: (id) => api.delete(`/api/paiements/${id}/`),
  },

  // Utilisateurs
  utilisateurs: {
    list: () => api.get('/api/users/'),
    get: (id) => api.get(`/api/users/${id}/`),
    update: (id, data) => api.put(`/api/user/${id}/`, data),
  },

  // Demandes
  demandes: {
    list: () => api.get('/api/demandes/'),
    create: (data) => api.post('/api/demandes/', data),
    update: (id, data) => api.put(`/api/demandes/${id}/update/`, data),
    get: (id) => api.get(`/api/demandes/${id}/`),
    accepter: (id) => api.patch(`/api/demandes/${id}/accepter/`),
    refuser: (id) => api.patch(`/api/demandes/${id}/refuser/`),
  },

  Notifications: {
    list: () => api.get('/api/notifications/'),
    create: (data) => api.post('/api/notifications/', data),
    delete: (id) => api.delete(`/api/notifications/${id}/`, data),

  },

  // Auth services
  auth: {
    login: (credentials) => api.post('/api/login/', credentials),
    verifyToken: () => api.post('/api/verify-token/'),
    getCurrentUser: () => {
      return {
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role'),
        telephone: localStorage.getItem('telephone'),
        is_superuser: localStorage.getItem('is_superuser') === 'true',
        first_name: localStorage.getItem('first_name'),
        last_name: localStorage.getItem('last_name'),
      };
    },
    logout: () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      localStorage.removeItem('is_superuser');
      localStorage.removeItem('first_name');
      localStorage.removeItem('last_name');
    }
  },
};

export { api as default, apiServices };
