from django.contrib import admin
from .models import Utilisateurs, Types, Immobiliers, Notifications, Contrats, Mois, Paiements


@admin.register(Utilisateurs)
class UtilisateursAdmin(admin.ModelAdmin):
    list_display = ('username', 'nom', 'prenom', 'email', 'telephone', 'role')
    search_fields = ('username', 'nom', 'email', 'telephone')
    list_filter = ('role',)


@admin.register(Types)
class TypesAdmin(admin.ModelAdmin):
    list_display = ('nom', 'description')


@admin.register(Immobiliers)
class ImmobiliersAdmin(admin.ModelAdmin):
    list_display = ('nom', 'adresse', 'superficie', 'montant', 'id_type', 'id_proprietaire')
    search_fields = ('nom', 'adresse')
    list_filter = ('id_type', 'id_proprietaire')


@admin.register(Notifications)
class NotificationsAdmin(admin.ModelAdmin):
    list_display = ('id_utilisateur', 'type', 'message', 'date')
    search_fields = ('message',)
    list_filter = ('type',)


@admin.register(Contrats)
class ContratsAdmin(admin.ModelAdmin):
    list_display = ('id_immobilier', 'id_locataire', 'date_debut', 'date_fin', 'montant')
    search_fields = ('id_immobilier__nom', 'id_locataire__username')
    list_filter = ('date_debut', 'date_fin')


@admin.register(Mois)
class MoisAdmin(admin.ModelAdmin):
    list_display = ('nom', 'annee', 'est_cloture')
    list_filter = ('annee', 'est_cloture')


@admin.register(Paiements)
class PaiementsAdmin(admin.ModelAdmin):
    list_display = ('id_contrat', 'id_mois', 'montant', 'date_paiement', 'methode_paiement', 'statut')
    search_fields = ('id_contrat__id',)
    list_filter = ('methode_paiement', 'statut', 'date_paiement')
