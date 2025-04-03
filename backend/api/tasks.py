from datetime import datetime, timedelta
# from celery import shared_task
from django.utils.timezone import now
from .models import Paiements, Contrats, Notifications, Utilisateurs

def generer_notification(utilisateur, message):
    Notifications.objects.create(id_utilisateur=utilisateur, type="Rappel", message=message)
    print(f"Notification générée pour {utilisateur}: {message}")

# @shared_task
def verifier_paiements_retard():
    today = now().date()
    contrats = Contrats.objects.all()
    
    for contrat in contrats:
        dernier_paiement = Paiements.objects.filter(id_contrat=contrat).order_by('-date_paiement').first()
        
        if dernier_paiement:
            jours_ecoules = (today - dernier_paiement.date_paiement).days
            
            if jours_ecoules >= 30 - 5:
                date_limite = dernier_paiement.date_paiement + timedelta(days=36)
                message = (f"Rappel de paiement pour {contrat.id_immobilier.nom}. "
                           f"Date limite: {date_limite.strftime('%d/%m/%Y')}.")
                print(message)
                generer_notification(contrat.id_locataire, message)
            
            if jours_ecoules >= 30 - 3 or jours_ecoules == 30 - 1:
                Paiements.objects.create(
                    id_contrat=contrat,
                    id_mois=dernier_paiement.id_mois,
                    montant=contrat.montant,
                    date_paiement=today,
                    methode_paiement='Non précisé',
                    statut='En retard',
                )
                message = f"Votre paiement est en retard pour {contrat.id_immobilier.nom}."
                generer_notification(contrat.id_locataire, message)
            
            if jours_ecoules > 35:
                message = (f"Attention! Expulsion possible pour {contrat.id_immobilier.nom}. "
                           "Veuillez régulariser votre situation immédiatement.")
                generer_notification(contrat.id_locataire, message)
        else:
            # Aucun paiement trouvé, considérer comme en retard dès le premier mois
            Paiements.objects.create(
                id_contrat=contrat,
                id_mois=None,  # À ajuster selon la logique de ton projet
                montant=contrat.montant,
                date_paiement=today,
                methode_paiement='Non précisé',
                statut='En retard',
            )
            message = f"Votre premier paiement est en retard pour {contrat.id_immobilier.nom}."
            generer_notification(contrat.id_locataire, message)

print("wve")