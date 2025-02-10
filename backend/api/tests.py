from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import *
from datetime import date

class UserTests(APITestCase):
    def setUp(self):
        # Créer un utilisateur pour les tests
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123',
            'nom': 'Test',
            'prenom': 'User',
            'telephone': '12345678',
            'role': 'client'
        }
        self.user = Utilisateurs.objects.create_user(**self.user_data)
        self.client = APIClient()

    def test_signup(self):
        """Test l'inscription d'un nouvel utilisateur"""
        url = reverse('signup')
        data = {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'newpass123',
            'nom': 'New',
            'prenom': 'User',
            'telephone': '87654321',
            'role': 'client'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Utilisateurs.objects.count(), 2)

    def test_login(self):
        """Test la connexion d'un utilisateur"""
        url = reverse('login')
        data = {
            'email': 'test@example.com',
            'password': 'testpass123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_invalid_login(self):
        """Test la connexion avec des identifiants invalides"""
        url = reverse('login')
        data = {
            'email': 'test@example.com',
            'password': 'wrongpass'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class TypeTests(APITestCase):
    def setUp(self):
        self.type_data = {
            'nom': 'Appartement',
            'description': 'Un appartement test'
        }
        self.type = Types.objects.create(**self.type_data)

    def test_create_type(self):
        """Test la création d'un type"""
        url = reverse('create-type')
        data = {
            'nom': 'Maison',
            'description': 'Une maison test'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Types.objects.count(), 2)

class ImmobilierTests(APITestCase):
    def setUp(self):
        # Créer un utilisateur propriétaire
        self.proprietaire = Utilisateurs.objects.create_user(
            username='owner',
            email='owner@example.com',
            password='ownerpass123',
            nom='Owner',
            prenom='Test',
            telephone='11111111',
            role='provider'
        )
        
        # Créer un type d'immobilier
        self.type = Types.objects.create(
            nom='Appartement',
            description='Un appartement test'
        )
        
        # Données pour l'immobilier
        self.immobilier_data = {
            'nom': 'Test Immo',
            'adresse': '123 Test St',
            'superficie': 100.0,
            'montant': 1000.0,
            'id_type': self.type.id,
            'id_proprietaire': self.proprietaire.id
        }

    def test_create_immobilier(self):
        """Test la création d'un immobilier"""
        url = reverse('create-immobilier')
        response = self.client.post(url, self.immobilier_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Immobiliers.objects.count(), 1)

class ContratTests(APITestCase):
    def setUp(self):
        # Créer propriétaire et locataire
        self.proprietaire = Utilisateurs.objects.create_user(
            username='proprio',
            email='proprio@example.com',
            password='propriopass123',
            nom='Proprio',
            prenom='Test',
            telephone='22222222',
            role='provider'
        )
        
        self.locataire = Utilisateurs.objects.create_user(
            username='locataire',
            email='locataire@example.com',
            password='locatairepass123',
            nom='Locataire',
            prenom='Test',
            telephone='33333333',
            role='client'
        )
        
        # Créer type et immobilier
        self.type = Types.objects.create(
            nom='Maison',
            description='Une maison test'
        )
        
        self.immobilier = Immobiliers.objects.create(
            nom='Maison Test',
            adresse='456 Test Ave',
            superficie=150.0,
            montant=2000.0,
            id_type=self.type,
            id_proprietaire=self.proprietaire
        )
        
        # Données pour le contrat
        self.contrat_data = {
            'id_immobilier': self.immobilier.id,
            'id_locataire': self.locataire.id,
            'date_debut': '2024-01-01',
            'date_fin': '2024-12-31',
            'montant': 2000.0,
            'url_document': 'http://example.com/doc.pdf'
        }

    def test_create_contrat(self):
        """Test la création d'un contrat"""
        url = reverse('create-contrat')
        response = self.client.post(url, self.contrat_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class PaiementTests(APITestCase):
    def setUp(self):
        # Configuration complète pour les tests de paiement
        self.proprietaire = Utilisateurs.objects.create_user(
            username='proprio',
            email='proprio@example.com',
            password='propriopass123',
            nom='Proprio',
            prenom='Test',
            telephone='44444444',
            role='provider'
        )
        
        self.locataire = Utilisateurs.objects.create_user(
            username='locataire',
            email='locataire@example.com',
            password='locatairepass123',
            nom='Locataire',
            prenom='Test',
            telephone='55555555',
            role='client'
        )
        
        self.type = Types.objects.create(
            nom='Studio',
            description='Un studio test'
        )
        
        self.immobilier = Immobiliers.objects.create(
            nom='Studio Test',
            adresse='789 Test Blvd',
            superficie=50.0,
            montant=1000.0,
            id_type=self.type,
            id_proprietaire=self.proprietaire
        )
        
        self.contrat = Contrats.objects.create(
            id_immobilier=self.immobilier,
            id_locataire=self.locataire,
            date_debut=date(2024, 1, 1),
            date_fin=date(2024, 12, 31),
            montant=1000.0,
            url_document='http://example.com/doc.pdf'
        )
        
        self.mois = Mois.objects.create(
            nom='Janvier',
            annee=2024,
            est_cloture=False
        )

    def test_create_paiement(self):
        """Test la création d'un paiement via l'API"""
        url = reverse('create-paiement')
        data = {
            'id_contrat': self.contrat.id,  # On envoie l'ID via l'API
            'id_mois': self.mois.id,
            'montant': 1000.0,
            'methode_paiement': 'Espèces',
            'statut': 'Payé'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_paiement_direct(self):
        """Test la création d'un paiement directement dans la base de données"""
        paiement = Paiements.objects.create(
            id_contrat=self.contrat,  # On passe l'instance directement
            id_mois=self.mois,
            montant=1000.0,
            methode_paiement='Espèces',
            statut='Payé'
        )
        self.assertIsNotNone(paiement.id)

    def test_list_paiements(self):
        """Test la liste des paiements"""
        # Créer un paiement directement avec les instances
        Paiements.objects.create(
            id_contrat=self.contrat,
            id_mois=self.mois,
            montant=1000.0,
            methode_paiement='Espèces',
            statut='Payé'
        )
        url = reverse('list-paiements')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
