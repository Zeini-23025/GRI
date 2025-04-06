from rest_framework import serializers
from .models import *   
import re
import datetime

class UserSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour le modèle Utilisateurs.
    """
    class Meta:
        model = Utilisateurs
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'telephone', 'role', 'nom', 'prenom', 'is_superuser')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }

    def create(self, validated_data):
        user = Utilisateurs.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            # first_name=validated_data.get('first_name', ''),
            # last_name=validated_data.get('last_name', ''),
            telephone=validated_data.get('telephone', ''),
            role=validated_data.get('role', 'client'),
            nom=validated_data.get('nom', ''),
            prenom=validated_data.get('prenom', ''),
        )
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.telephone = validated_data.get('telephone', instance.telephone)
        instance.nom = validated_data.get('nom', instance.nom)
        instance.prenom = validated_data.get('prenom', instance.prenom)
        instance.role = validated_data.get('role', instance.role)
        instance.is_superuser = validated_data.get('is_superuser', instance.is_superuser)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()
        return instance
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            # 'data':{
            'id': representation['id'],
            'username': instance.username,
            'email': instance.email,
            'first_name': instance.first_name,
            'last_name': instance.last_name,
            'telephone': instance.telephone,
            'role': instance.role,
            # }
        }



class TypesSerializer(serializers.ModelSerializer):
    class Meta:

        model = Types
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            # 'data': {
                'id': representation['id'], 
                'nom': instance.nom,
                'description': instance.description,
            # }
        }



class ImmobiliersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Immobiliers
        fields = ('id', 'nom', 'adresse', 'superficie', 'montant', 'created_at', 'updated_at', 'id_type', 'id_proprietaire')
        exra_kwargs = {}

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            # 'data': {
            #     'immobilier': {
                    'id': representation['id'],
                    'nom': instance.nom,
                    'adresse': instance.adresse,
                    'superficie': instance.superficie,
                    'montant': instance.montant,
                    'created_at': representation['created_at'],
                    'updated_at': representation['updated_at'],
                    'type': instance.id_type.nom,
                    'proprietaire': instance.id_proprietaire.nom,
            #     }
            # }
        }



class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            # 'data': {
                'id_utilisateur': instance.id_utilisateur.id,
                'type': instance.type,  
                'message': instance.message,
                'date': instance.date,
            # }
        }


class ContratsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contrats
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            # 'data': {
                'id': instance.id,
                'id_immobilier': instance.id_immobilier.nom,
                'id_locataire': instance.id_locataire.id,
                'date_debut': instance.date_debut,
                'date_fin': instance.date_fin,
                'montant': instance.montant,
                'url_document': instance.url_document,
                'created_at': instance.created_at,
                
            # }
        }


class MoisSerializers(serializers.ModelSerializer):
    class Meta:
        model = Mois
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            # 'data': {
                'nom': instance.nom,
                'annee': instance.annee,
                'est_cloture': instance.est_cloture,
            # }
        }




class PaiementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paiements
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            # 'data': {
                'id': instance.id,
                'locataire': instance.id_contrat.id_locataire.nom + ' ' + str(instance.id_contrat.id_locataire.prenom),
                'id_locataire': instance.id_contrat.id_locataire.id,
                'mois': instance.id_mois.nom + ' ' + str(instance.id_mois.annee),
                'montant': instance.montant,
                'date_paiement': instance.date_paiement,
                'methode_paiement': instance.methode_paiement,
                'statut': instance.statut,
                'contrat': instance.id_contrat.id,
                'id_mois': instance.id_mois.id,

            # }


        }

class DemandesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demandes
        fields = '__all__'

    def validate(self, data):
        # Valider l'email
        if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', data.get('email', '')):
            raise serializers.ValidationError({'email': 'Format d\'email invalide'})

        # Valider la durée
        if data.get('duree', 0) <= 0:
            raise serializers.ValidationError({'duree': 'La durée doit être un nombre positif'})

        # Valider la date de début
        if data.get('date_debut') and data.get('date_debut') < datetime.date.today():
            raise serializers.ValidationError({'date_debut': 'La date de début doit être ultérieure à aujourd\'hui'})

        return data

    def create(self, validated_data):
        # S'assurer que le statut est "en_attente" à la création
        validated_data['statut'] = 'en_attente'
        return super().create(validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        print('User-id : ', instance.id_user.id)
        return {
            'id': instance.id,
            'id_user': instance.id_user.id,
            'nom_complet': instance.nom_complet,
            'email': instance.email,
            'telephone': instance.telephone,
            'date_debut': instance.date_debut,
            'duree': instance.duree,
            'message': instance.message,
            'date_demande': instance.date_demande,
            'statut': instance.statut,
            'immobilier': {
                'id': instance.id_immobilier.id,
                'nom': instance.id_immobilier.nom,

            }
        }