# Utiliser une image officielle de Python
FROM python:3.10

# Définir le répertoire de travail
WORKDIR /api

# Copier les fichiers du projet dans le conteneur
COPY . .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Exposer le port (par défaut Django utilise 8000)
EXPOSE 8000

# Commande pour exécuter l'application
CMD ["gunicorn", "-b", "0.0.0.0:8000", "api.wsgi:application"]
