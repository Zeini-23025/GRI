from rest_framework import serializers
from .models import *   

class UserSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour le modèle Utilisateurs.
    """
    class Meta:
        model = Utilisateurs
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'telephone', 'role')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }

    def create(self, validated_data):
        user = Utilisateurs.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            telephone=validated_data.get('telephone', ''),
            role=validated_data.get('role', 'client'),
        )
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.telephone = validated_data.get('telephone', instance.telephone)
        instance.role = validated_data.get('role', instance.role)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()
        return instance


class TypesSerializer(serializers.ModelField):
    class Meta:
        model = Types
        fields = ('id', 'nom', 'description')
        extra_kwargs = {}


class ImmobiliersSerializer(serializers.ModelSerializer):
    class Meta:
        models = Immobiliers
        fields = ('id', 'nom', 'adresse', 'superficie', 'montant', 'created_at', 'updated_at', 'id_type', 'id_proprietaire')
        exra_kwargs = {}


class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = ('id', 'id_utilisateur', 'type', 'message', 'date')
        extra_kwargs = {}

class ContratsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contrats
        fields = ('id', 'id_immobilier', 'id_locataire', 'date_debut', 'date_fin', 'montant', 'url_document', 'created_at')
        extra_kwargs = {}


class MoisSerializers(serializers.ModelSerializer):
    class Meta:
        model = Mois
        fields = ('id', 'nom', 'annee', 'est_cloture')
        extra_kwargs = {}


class PaiementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paiements
        fields = ('id', 'id_contrat', 'id_mois', 'montant', 'date_paiement', 'methode_paiement', 'statut')