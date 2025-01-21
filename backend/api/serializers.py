from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'nom', 'prenom', 'email', 'telephone', 'role', 'password')
        extra_kwargs = {"password": {'write_only':True} }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
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