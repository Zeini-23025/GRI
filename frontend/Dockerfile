# Étape 1 : Build de l'application React
FROM node:18 AS build

WORKDIR /app

# Copier uniquement les fichiers de dépendances pour optimiser le cache
COPY package.json package-lock.json ./

# Supprimer les anciennes installations pour éviter les bugs
RUN rm -rf node_modules package-lock.json && npm cache clean --force

# Réinstaller proprement les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Construire l'application React
RUN npm run build
