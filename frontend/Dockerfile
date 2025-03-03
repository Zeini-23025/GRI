# Utilisation de Node.js
FROM node:18

# Définition du répertoire de travail
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package.json .
RUN npm install

# Copier le reste du code
COPY . .

# Construire l'application React
RUN npm run build

# Utiliser nginx pour servir l'application
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
