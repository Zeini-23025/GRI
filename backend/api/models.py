from django.db import models
from django.contrib.auth.models import AbstractUser

class Utilisateurs(AbstractUser):
    """Model representing a user in the system"""
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(max_length=255, unique=True)
    telephone = models.CharField(max_length=50, unique=True)
    role = models.CharField(max_length=50)  # Ajout de max_length

    def __str__(self):
        return f"{self.prenom} {self.nom}"


class Types(models.Model):
    nom = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.nom


class Immobiliers(models.Model):
    nom = models.CharField(max_length=255)
    adresse = models.CharField(max_length=255)
    superficie = models.FloatField()
    montant = models.FloatField(default=0.0)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    id_type = models.ForeignKey(Types, on_delete=models.CASCADE)
    id_proprietaire = models.ForeignKey(Utilisateurs, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nom} - {self.adresse}"


class Notifications(models.Model):
    id_utilisateur = models.ForeignKey(Utilisateurs, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)  # Ajout de max_length
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification: {self.message}"


class Contrats(models.Model):
    id_immobilier = models.ForeignKey(Immobiliers, on_delete=models.CASCADE)
    id_locataire = models.ForeignKey(Utilisateurs, on_delete=models.CASCADE)
    date_debut = models.DateField()
    date_fin = models.DateField()
    montant = models.FloatField(default=0.0)
    url_document = models.CharField(max_length=255)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Contrat: {self.id}  Immobilier: {self.id_immobilier.nom}"


class Mois(models.Model):
    nom = models.CharField(max_length=50)
    annee = models.IntegerField()
    est_cloture = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nom} {self.annee}  Clôturé: {self.est_cloture}"


class Paiements(models.Model):  # Renommé en PascalCase
    id_contrat = models.ForeignKey(Contrats, on_delete=models.CASCADE)
    id_mois = models.ForeignKey(Mois, on_delete=models.CASCADE)
    montant = models.FloatField(default=0.0)
    date_paiement = models.DateField(auto_now_add=True)
    methode_paiement = models.CharField(max_length=50)  # Ajout de max_length
    statut = models.CharField(max_length=50)  # Ajout de max_length

    def __str__(self):
        return f"Paiement: {self.id_contrat}  {self.montant} MRU"
