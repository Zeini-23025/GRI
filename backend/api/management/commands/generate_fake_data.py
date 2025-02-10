from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from api.models import *
from faker import Faker
import random
from datetime import datetime, timedelta

fake = Faker(['fr_FR'])

class Command(BaseCommand):
    help = 'Génère des données de test pour la base de données'

    def handle(self, *args, **kwargs):
        self.stdout.write('Génération des données de test...')
        
        # Création des utilisateurs
        roles = ['client', 'provider']
        users = []
        for _ in range(50):
            user = Utilisateurs.objects.create(
                username=fake.user_name(),
                email=fake.email(),
                password=make_password('password123'),
                nom=fake.last_name(),
                prenom=fake.first_name(),
                telephone=fake.phone_number(),
                role=random.choice(roles)
            )
            users.append(user)
        
        # Création des types d'immobilier
        types = [
            "Appartement", "Maison", "Villa", "Studio", "Bureau", 
            "Local commercial", "Entrepôt", "Terrain", "Immeuble"
        ]
        type_objects = []
        for type_name in types:
            type_obj = Types.objects.create(
                nom=type_name,
                description=fake.text(max_nb_chars=200)
            )
            type_objects.append(type_obj)

        # Création des immobiliers
        immobiliers = []
        for _ in range(100):
            proprietaire = random.choice([u for u in users if u.role == 'provider'])
            immobilier = Immobiliers.objects.create(
                nom=fake.company(),
                adresse=fake.address(),
                superficie=random.uniform(30, 500),
                montant=random.uniform(100000, 5000000),
                id_type=random.choice(type_objects),
                id_proprietaire=proprietaire
            )
            immobiliers.append(immobilier)

        # Création des contrats
        contrats = []
        for _ in range(150):
            date_debut = fake.date_between(start_date='-2y', end_date='today')
            date_fin = date_debut + timedelta(days=random.randint(180, 730))
            contrat = Contrats.objects.create(
                id_immobilier=random.choice(immobiliers),
                id_locataire=random.choice([u for u in users if u.role == 'client']),
                date_debut=date_debut,
                date_fin=date_fin,
                montant=random.uniform(50000, 2000000),
                url_document=f"contrats/contrat_{fake.uuid4()}.pdf"
            )
            contrats.append(contrat)

        # Création des mois
        mois_noms = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                     'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
        mois_objects = []
        for annee in [2022, 2023, 2024]:
            for nom in mois_noms:
                mois = Mois.objects.create(
                    nom=nom,
                    annee=annee,
                    est_cloture=annee < 2024 or (annee == 2024 and mois_noms.index(nom) < datetime.now().month)
                )
                mois_objects.append(mois)

        # Création des paiements
        methodes_paiement = ['Espèces', 'Chèque', 'Virement', 'Mobile Money']
        statuts = ['Payé', 'En attente', 'Retard', 'Annulé']
        
        for contrat in contrats:
            for mois in random.sample(mois_objects, random.randint(5, 24)):
                Paiements.objects.create(
                    id_contrat=contrat,
                    id_mois=mois,
                    montant=contrat.montant * random.uniform(0.8, 1.2),
                    methode_paiement=random.choice(methodes_paiement),
                    statut=random.choice(statuts)
                )

        # Création des notifications
        types_notifications = ['Paiement', 'Retard', 'Contrat', 'Maintenance', 'Information']
        for user in users:
            for _ in range(random.randint(2, 8)):
                Notifications.objects.create(
                    id_utilisateur=user,
                    type=random.choice(types_notifications),
                    message=fake.sentence(nb_words=10)
                )

        self.stdout.write(self.style.SUCCESS('Données générées avec succès!')) 