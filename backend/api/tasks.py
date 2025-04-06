from celery import shared_task
from .paiement_manager import PaiementManager
import logging

logger = logging.getLogger(__name__)

@shared_task
def task_verifier_paiements_retard():
    try:
        logger.info("Début de la tâche de vérification des paiements")
        PaiementManager.verifier_paiements_retard()
        logger.info("Tâche de vérification des paiements terminée avec succès")
    except Exception as e:
        logger.error(f"Échec de la tâche de vérification: {str(e)}", exc_info=True)
        raise