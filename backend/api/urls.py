# from django.urls import path,include
# from .views import *
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'Notification', NotificationViewSet, basename='Notification')




# urlpatterns = [

#     path('', include(router.urls)),
#     path('signup/', SignupView.as_view(), name='signup'),
#     path('login/', LoginView.as_view(), name='login'),
#     path('verify-token/', VerifyTokenView.as_view(), name='verify_token'),  # Nouvelle route
#     path('users/', ListUsers.as_view(), name='list-users'),
#     path('user/update/<int:id>/', UpdateUserView.as_view(), name='update_user'),
#     path('immobiliers/', ListImmobiliers.as_view(), name='list-immobiliers'),
#     path('immobiliers/<int:id>/', RetrieveImmobilier.as_view(), name='retrieve-immobilier'),
#     path('immobiliers/create/', CreateImmobilier.as_view(), name='create-immobilier'),
#     path('immobiliers/<int:id>/update/', UpdateImmobilier.as_view(), name='update-immobilier'),
#     path('immobiliers/<int:id>/delete/', DeleteImmobilier.as_view(), name='delete-immobilier'),
#     path('types/', ListTypes.as_view(), name='list-types'),
#     path('types/<int:id>/', RetrieveType.as_view(), name='retrieve-type'),
#     path('types/create/', CreateType.as_view(), name='create-type'),
#     path('types/<int:id>/update/', UpdateType.as_view(), name='update-type'),
#     path('types/<int:id>/delete/', DeleteType.as_view(), name='delete-type'),
#     path('contrats/', ListContrats.as_view(), name='list-contrats'),
#     path('contrats/<int:id>/', RetrieveContrat.as_view(), name='retrieve-contrat'),
#     path('contrats/create/', CreateContrat.as_view(), name='create-contrat'),
#     path('contrats/<int:id>/update/', UpdateContrat.as_view(), name='update-contrat'),
#     path('contrats/<int:id>/delete/', DeleteContrat.as_view(), name='delete-contrat'),
#     path('paiements/', ListPaiements.as_view(), name='list-paiements'),
#     path('paiements/<int:id>/', RetrievePaiement.as_view(), name='retrieve-paiement'),
#     path('paiements/create/', CreatePaiement.as_view(), name='create-paiement'),
#     path('paiements/<int:id>/update/', UpdatePaiement.as_view(), name='update-paiement'),
#     path('paiements/<int:id>/delete/', DeletePaiement.as_view(), name='delete-paiement'),
#     path('demandes/', ListDemandes.as_view(), name='list-demandes'),
#     path('demandes/create/', CreateDemande.as_view(), name='create-demande'),
#     path('demandes/<int:id>/update/', UpdateDemande.as_view(), name='update-demande'),
#     path('demandes/<int:id>/accepter/', AccepterDemandeView.as_view(), name='accepter-demande'),
#     path('demandes/<int:id>/refuser/', RefuserDemandeView.as_view(), name='refuser-demande'),
# ]





# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'immobiliers', ImmobilierViewSet, basename='immobiliers')
router.register(r'types', TypeViewSet, basename='types')
router.register(r'contrats', ContratViewSet, basename='contrats')
router.register(r'paiements', PaiementViewSet, basename='paiements')
router.register(r'demandes', DemandeViewSet, basename='demandes')
router.register(r'notifications', NotificationViewSet, basename='notifications')

urlpatterns = [path('', include(router.urls)),
              path('login/', LoginView.as_view(), name='login'),
                path('demandes/<int:id>/accepter/', AccepterDemandeView.as_view(), name='accepter-demande'),
                path('demandes/<int:id>/refuser/', RefuserDemandeView.as_view(), name='refuser-demande'),
]
