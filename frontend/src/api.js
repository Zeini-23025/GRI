import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
  baseURL: "http://localhost:8000", // Assurez-vous que cette URL est correcte
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

export default api;
