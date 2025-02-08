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
                'id_utilisateur': instance.id_utilisateur.nom,
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
                'id_immobilier': instance.id_immobilier.nom,
                'id_locataire': instance.id_locataire.nom,
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
                'id_contrat': instance.id_contrat.id_immobilier.nom,
                'id_mois': instance.id_mois.nom,
                'montant': instance.montant,
                'date_paiement': instance.date_paiement,
                'methode_paiement': instance.methode_paiement,
                'statut': instance.statut,
            # }

        }