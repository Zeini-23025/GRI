import pytest
from rest_framework.test import APIClient
from rest_framework import status
from .models import Utilisateurs, Immobiliers, Types, Contrats, Paiements, Demandes, Notifications, Mois


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def utilisateur():
    return Utilisateurs.objects.create_user(
        username='testuser', email='test@example.com', password='password123', nom='Test', prenom='User', telephone='0612345678'
    )


@pytest.fixture
def type_immobilier():
    return Types.objects.create(nom="Appartement", description="Un bel appartement")


@pytest.fixture
def immobilier(type_immobilier, utilisateur):
    return Immobiliers.objects.create(
        nom="Villa", adresse="123 Rue ABC", superficie=120.5, montant=1000, id_type=type_immobilier, id_proprietaire=utilisateur
    )


@pytest.fixture
def contrat(utilisateur, immobilier):
    return Contrats.objects.create(
        id_immobilier=immobilier, id_locataire=utilisateur, date_debut="2025-01-01", date_fin="2025-12-31", montant=1200, url_document="contract.pdf"
    )


@pytest.fixture
def mois():
    return Mois.objects.create(mois="2025-04")  # Assurez-vous que cette ligne correspond à votre modèle Mois


@pytest.fixture
def paiement(contrat, mois):
    return Paiements.objects.create(
        id_contrat=contrat,
        id_mois=mois,  # Ajoutez ici l'attribution de `id_mois`
        montant=1200,
        methode_paiement="Virement",
        statut="Payé"
    )


@pytest.fixture
def demande(utilisateur, immobilier):
    return Demandes.objects.create(
        nom_complet="Jean Dupont", email="jean@example.com", telephone="0612345678", date_debut="2025-06-01", duree=12, id_immobilier=immobilier, id_user=utilisateur
    )


@pytest.fixture
def notification(utilisateur):
    return Notifications.objects.create(id_utilisateur=utilisateur, type="Alerte", message="Paiement en retard")


@pytest.mark.django_db
def test_utilisateur_creation(utilisateur):
    assert Utilisateurs.objects.count() == 1
    assert utilisateur.email == "test@example.com"


@pytest.mark.django_db
def test_immobilier_creation(immobilier):
    assert Immobiliers.objects.count() == 1
    assert immobilier.nom == "Villa"


@pytest.mark.django_db
def test_contrat_creation(contrat):
    assert Contrats.objects.count() == 1
    assert contrat.montant == 1200


@pytest.mark.django_db
def test_api_signup(api_client):
    response = api_client.post("/api/users/signup/", {
        "username": "newuser", "email": "new@example.com", "password": "password123", "nom": "New", "prenom": "User", "telephone": "0623456789"
    }, format="json")
    assert response.status_code == status.HTTP_201_CREATED
    assert "user" in response.data
    assert response.data["message"] == "Inscription réussie"


@pytest.mark.django_db
def test_api_login(api_client, utilisateur):
    response = api_client.post("/api/users/login/", {
        "email": "test@example.com", "password": "password123"
    }, format="json")
    assert response.status_code == status.HTTP_200_OK
    assert "access" in response.data
    assert "refresh" in response.data


@pytest.mark.django_db
def test_api_verify_token(api_client, utilisateur):
    response = api_client.post("/api/users/login/", {
        "email": "test@example.com", "password": "password123"
    }, format="json")
    token = response.data["access"]
    response = api_client.get("/api/users/verify-token/", HTTP_AUTHORIZATION=f"Bearer {token}")
    assert response.status_code == status.HTTP_200_OK
    assert response.data["valid"] is True


@pytest.mark.django_db
def test_api_immobiliers(api_client, immobilier):
    response = api_client.get("/api/immobiliers/")
    assert response.status_code == status.HTTP_200_OK
    assert response.data[0]["nom"] == "Villa"


@pytest.mark.django_db
def test_api_demandes(api_client, demande):
    response = api_client.get("/api/demandes/")
    assert response.status_code == status.HTTP_200_OK
    assert response.data[0]["nom_complet"] == "Jean Dupont"


@pytest.mark.django_db
def test_accepter_demande(api_client, demande, utilisateur):
    # Se connecter avec l'utilisateur avant d'envoyer la requête
    api_client.force_authenticate(user=utilisateur)
    response = api_client.patch(f"/api/demandes/{demande.id}/accepter/")
    assert response.status_code == status.HTTP_200_OK
    assert response.data["message"] == "Demande acceptée"
    assert Demandes.objects.get(id=demande.id).statut == "Acceptée"


@pytest.mark.django_db
def test_refuser_demande(api_client, demande, utilisateur):
    # Se connecter avec l'utilisateur avant d'envoyer la requête
    api_client.force_authenticate(user=utilisateur)
    response = api_client.patch(f"/api/demandes/{demande.id}/refuser/")
    assert response.status_code == status.HTTP_200_OK
    assert response.data["message"] == "Demande refusée"
    assert Demandes.objects.get(id=demande.id).statut == "Refusée"


@pytest.mark.django_db
def test_paiement_creation(paiement):
    assert Paiements.objects.count() == 1
    assert paiement.montant == 1200


@pytest.mark.django_db
def test_notification_creation(notification):
    assert Notifications.objects.count() == 1
    assert notification.message == "Paiement en retard"
 