from datetime import datetime, timedelta
from django.utils import timezone
from .models import Paiements, Contrats, Notifications, Utilisateurs, Mois
import logging

# Configuration du logging
logger = logging.getLogger(__name__)

class PaiementManager:
    """
    Gestionnaire des paiements avec système de notifications et rappels
    """
    
    @staticmethod
    def generer_notification(utilisateur, message, niveau='info'):
        """
        Génère une notification et la log dans le système
        """
        niveaux_notification = {
            'info': 'Information',
            'warning': 'Avertissement',
            'danger': 'Urgent'
        }
        
        notification_type = niveaux_notification.get(niveau, 'Information')
        
        try:
            Notifications.objects.create(
                id_utilisateur=utilisateur,
                type=notification_type,
                message=message
            )
            logger.info(f"Notification envoyée à {utilisateur.email}: {message}")
        except Exception as e:
            logger.error(f"Erreur lors de l'envoi de notification: {str(e)}")

    @staticmethod
    def verifier_et_creer_mois_courant():
        """
        Vérifie et crée le mois courant s'il n'existe pas
        """
        now = timezone.now()
        mois_courant = now.strftime("%B")  # Nom complet du mois
        annee_courante = now.year
        
        mois, created = Mois.objects.get_or_create(
            nom=mois_courant,
            annee=annee_courante,
            defaults={'est_cloture': False}
        )
        
        return mois

    @staticmethod
    def verifier_paiements_retard():
        """
        Vérifie les paiements en retard et envoie des notifications
        """
        today = timezone.now().date()
        mois_courant = PaiementManager.verifier_et_creer_mois_courant()
        contrats = Contrats.objects.filter(date_fin__gte=today)  # Seulement contrats actifs
        
        logger.info(f"Début de la vérification des paiements pour le {today}")
        
        for contrat in contrats:
            try:
                dernier_paiement = Paiements.objects.filter(
                    id_contrat=contrat
                ).order_by('-date_paiement').first()
                
                if dernier_paiement:
                    # Cas où il y a déjà des paiements
                    jours_ecoules = (today - dernier_paiement.date_paiement).days
                    mois_ecoules = jours_ecoules // 30
                    
                    # Notification préventive (5 jours avant échéance)
                    if 25 <= jours_ecoules < 30:
                        message = (
                            f"Rappel: Votre paiement pour {contrat.id_immobilier.nom} "
                            f"est dû dans {30 - jours_ecoules} jours."
                        )
                        PaiementManager.generer_notification(
                            contrat.id_locataire, 
                            message, 
                            niveau='warning'
                        )
                    
                    # Paiement en retard (1-15 jours)
                    elif 30 <= jours_ecoules < 45:
                        # Créer un enregistrement de paiement en retard
                        Paiements.objects.create(
                            id_contrat=contrat,
                            id_mois=mois_courant,
                            montant=contrat.montant,
                            date_paiement=today,
                            methode_paiement='en_retard',
                            statut='En retard',
                        )
                        
                        message = (
                            f"ATTENTION: Paiement en retard pour {contrat.id_immobilier.nom}. "
                            f"Veuillez régulariser au plus vite."
                        )
                        PaiementManager.generer_notification(
                            contrat.id_locataire, 
                            message, 
                            niveau='danger'
                        )
                        
                        # Notifier aussi le propriétaire
                        message_proprio = (
                            f"Le locataire {contrat.id_locataire.get_full_name()} "
                            f"est en retard pour le paiement de {contrat.id_immobilier.nom}."
                        )
                        PaiementManager.generer_notification(
                            contrat.id_immobilier.id_proprietaire, 
                            message_proprio, 
                            niveau='warning'
                        )
                    
                    # Retard sévère (> 45 jours)
                    elif jours_ecoules >= 45:
                        message = (
                            f"RETARD SÉVÈRE: Votre contrat pour {contrat.id_immobilier.nom} "
                            "risque d'être résilié. Contactez-nous immédiatement."
                        )
                        PaiementManager.generer_notification(
                            contrat.id_locataire, 
                            message, 
                            niveau='danger'
                        )
                
                else:
                    # Cas où aucun paiement n'a encore été effectué
                    debut_contrat = contrat.date_debut
                    jours_depuis_debut = (today - debut_contrat).days
                    
                    if jours_depuis_debut >= 30:
                        # Créer un enregistrement de paiement en retard
                        Paiements.objects.create(
                            id_contrat=contrat,
                            id_mois=mois_courant,
                            montant=contrat.montant,
                            date_paiement=today,
                            methode_paiement='premier_retard',
                            statut='En retard',
                        )
                        
                        message = (
                            f"Premier paiement en retard pour {contrat.id_immobilier.nom}. "
                            "Veuillez effectuer votre paiement immédiatement."
                        )
                        PaiementManager.generer_notification(
                            contrat.id_locataire, 
                            message, 
                            niveau='danger'
                        )
                        
            except Exception as e:
                logger.error(
                    f"Erreur lors du traitement du contrat {contrat.id}: {str(e)}",
                    exc_info=True
                )
        
        logger.info("Vérification des paiements terminée")

# Fonction pour Celery
def task_verifier_paiements_retard():
    PaiementManager.verifier_paiements_retard()