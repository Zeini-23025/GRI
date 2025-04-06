# Utiliser une image officielle de Python
FROM python:3.10

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement requirements.txt pour optimiser le cache
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port (Django utilise généralement 8000)
EXPOSE 8000

# Commande pour exécuter le serveur Gunicorn avec Django
CMD ["gunicorn", "-b", "0.0.0.0:8000", "backend.wsgi:application"]

