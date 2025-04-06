from rest_framework.views import APIView
# from rest_framework.response import Response
from rest_framework import status,generics,viewsets,decorators
from rest_framework.permissions import *
# from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
# from django.contrib.auth.models import User 
from .serializers import *
# from rest_framework import status


    ##########################  user part    ##########################

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             self.perform_create(serializer)
#             return Response(
#                 {
#                     "message": "Inscription réussie",
#                     "user": serializer.data
#                 },
#                 status=status.HTTP_201_CREATED
#             )
#         return Response(
#             serializer.errors,
#             status=status.HTTP_400_BAD_REQUEST
#         )


#     # def post(self, request):
#     #     serializer = UserSerializer(data=request.data)
#     #     if serializer.is_valid():
#     #         serializer.save()
#     #         return Response(
#     #             {"message": "User created successfully!"},
#     #             status=status.HTTP_201_CREATED
#     #         )
#     #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    Vue pour permettre à un utilisateur de se connecter et obtenir un token JWT.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = Utilisateurs.objects.get(email=email)
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "access": str(refresh.access_token),
                        "refresh": str(refresh),
                        "id": user.id,
                        "username": user.username,
                        "telephone":user.telephone,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "role": user.role,
                        "is_superuser": user.is_superuser,
                    },
                    status=status.HTTP_200_OK
                )
            return Response(
                {"error": "Mot de passe incorrect"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Utilisateurs.DoesNotExist:
            return Response(
                {"error": "Utilisateur non trouvé"},
                status=status.HTTP_404_NOT_FOUND
            )

# class ListUsers(generics.ListAPIView):
#     queryset = Utilisateurs.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'

    
# class UpdateUserView(generics.UpdateAPIView):
#     """
#     Vue pour permettre à un utilisateur connecté de modifier ses informations.
#     """
#     queryset = Utilisateurs.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [IsAdminUser]
#     lookup_field = 'id'

#     def update(self, request, *args, **kwargs):
#         partial = kwargs.pop('partial', False)
#         instance = self.get_object()
#         serializer = self.get_serializer(instance, data=request.data, partial=partial)
        
#         if serializer.is_valid():
#             self.perform_update(serializer)
#             return Response(
#                 {
#                     "message": "Informations mises à jour avec succès",
#                     "user": serializer.data
#                 },
#                 status=status.HTTP_200_OK
#             )
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class CreateImmobilier(generics.CreateAPIView):
#     queryset = Immobiliers.objects.all()
#     serializer_class = ImmobiliersSerializer
#     permission_classes = [IsAdminUser]

# class UpdateImmobilier(generics.UpdateAPIView):
#     queryset = Immobiliers.objects.all()
#     serializer_class = ImmobiliersSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'

# class DeleteImmobilier(generics.DestroyAPIView):
#     queryset = Immobiliers.objects.all()
#     serializer_class = ImmobiliersSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'

# class ListImmobiliers(generics.ListAPIView):
#     queryset = Immobiliers.objects.all()
#     serializer_class = ImmobiliersSerializer
#     permission_classes = [AllowAny]

# class RetrieveImmobilier(generics.RetrieveAPIView):
#     queryset = Immobiliers.objects.all()
#     serializer_class = ImmobiliersSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'

# # Vues pour Types
# class CreateType(generics.CreateAPIView):
#     queryset = Types.objects.all()
#     serializer_class = TypesSerializer
#     permission_classes = [AllowAny]

# class UpdateType(generics.UpdateAPIView):
#     queryset = Types.objects.all()
#     serializer_class = TypesSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'

# class DeleteType(generics.DestroyAPIView):
#     queryset = Types.objects.all()
#     serializer_class = TypesSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'

# class ListTypes(generics.ListAPIView):
#     queryset = Types.objects.all()
#     serializer_class = TypesSerializer
#     permission_classes = [AllowAny]

# class RetrieveType(generics.RetrieveAPIView):
#     queryset = Types.objects.all()
#     serializer_class = TypesSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'



# # Vues pour Contrats
# class CreateContrat(generics.CreateAPIView):
#     queryset = Contrats.objects.all()
#     serializer_class = ContratsSerializer
#     permission_classes = [AllowAny]

# class UpdateContrat(generics.UpdateAPIView):
#     queryset = Contrats.objects.all()
#     serializer_class = ContratsSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'

# class DeleteContrat(generics.DestroyAPIView):
#     queryset = Contrats.objects.all()
#     serializer_class = ContratsSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'

# class ListContrats(generics.ListAPIView):
#     queryset = Contrats.objects.all()
#     serializer_class = ContratsSerializer
#     permission_classes = [AllowAny]

# class RetrieveContrat(generics.RetrieveAPIView):
#     queryset = Contrats.objects.all()
#     serializer_class = ContratsSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'


# # Vues pour Paiements
# class CreatePaiement(generics.CreateAPIView):
#     queryset = Paiements.objects.all()
#     serializer_class = PaiementsSerializer
#     permission_classes = [AllowAny]

# class UpdatePaiement(generics.UpdateAPIView):
#     queryset = Paiements.objects.all()
#     serializer_class = PaiementsSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'

# class DeletePaiement(generics.DestroyAPIView):
#     queryset = Paiements.objects.all()
#     serializer_class = PaiementsSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'

# class ListPaiements(generics.ListAPIView):
#     queryset = Paiements.objects.all()
#     serializer_class = PaiementsSerializer
#     permission_classes = [AllowAny]

# class RetrievePaiement(generics.RetrieveAPIView):
#     queryset = Paiements.objects.all()
#     serializer_class = PaiementsSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'
# class VerifyTokenView(APIView):
#     """
#     Vue pour vérifier la validité du token JWT.
#     """
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         return Response({
#             "valid": True,
#             "user": {
#                 "username": request.user.username,
#                 "email": request.user.email,
#                 "role": request.user.role
#             }
#         })

# class CreateDemande(generics.CreateAPIView):
#     queryset = Demandes.objects.all()
#     serializer_class = DemandesSerializer
#     permission_classes = [AllowAny]

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             self.perform_create(serializer)
#             return Response(
#                 {
#                     "message": "Demande créée avec succès",
#                     "demande": serializer.data
#                 },
#                 status=status.HTTP_201_CREATED
#             )
#         return Response(
#             {
#                 "error": "Erreur de validation",
#                 "details": serializer.errors
#             },
#             status=status.HTTP_400_BAD_REQUEST
#         )

# class ListDemandes(generics.ListAPIView):
#     queryset = Demandes.objects.all()
#     serializer_class = DemandesSerializer
#     permission_classes = [AllowAny]

# class UpdateDemande(generics.UpdateAPIView):
#     queryset = Demandes.objects.all()
#     serializer_class = DemandesSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'id'

class AccepterDemandeView(generics.UpdateAPIView):
   
    queryset = Demandes.objects.all()
    serializer_class = DemandesSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Vérifier si la demande n'est pas déjà traitée
        if instance.statut != 'en_attente':
            return Response(
                {"error": "Cette demande a déjà été traitée"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Mettre à jour le statut
        instance.statut = 'Acceptée'
        instance.save()

        serializer = self.get_serializer(instance)
        return Response(
            {
                "message": "Demande acceptée avec succès",
                "demande": serializer.data
            },
            status=status.HTTP_200_OK
        )

class RefuserDemandeView(generics.UpdateAPIView):
    """
    Vue pour refuser une demande de location
    """
    queryset = Demandes.objects.all()
    serializer_class = DemandesSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Vérifier si la demande n'est pas déjà traitée
        if instance.statut != 'en_attente':
            return Response(
                {"error": "Cette demande a déjà été traitée"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Mettre à jour le statut
        instance.statut = 'Refusée'
        instance.save()

        serializer = self.get_serializer(instance)
        return Response(
            {
                "message": "Demande refusée avec succès",
                "demande": serializer.data
            },
            status=status.HTTP_200_OK
        )

# class NotificationViewSet(viewsets.ModelViewSet):
#     queryset = Notifications.objects.all()
#     serializer_class = NotificationsSerializer
#     permission_classes = [AllowAny]
    
#     @decorators.action(detail=False, methods=['get'], url_path='list', url_name='list')
#     def list(self,):
#        queryset = self.queryset
#        lookup_field = 'id'

        


#     @decorators.action(detail=False, methods=['post'], url_path='create', url_name='create')
#     def create(self, request):
#         serializer = self.get_serializer(data=request.data)
#         client = Utilisateurs.get(id= serializer.data.id_user)
#         if serializer.is_valid() and client:
#             self.perform_create
#             return Response(
#                 {
#                 'message': f'notification envoyer avec succé a {client.prenom} {client.nom}',
#                 'Notification': serializer.data
#                 }, 
#                 status= status.HTTP_201_CREATED
#             )
#         return Response(
#             {
#             'message': f'Une erreur s\'est produit lors de l\'envoie du notification',
#             'Notification': serializer.data
#             },
#             status = status.HTTP_400_BAD_REQUEST
#         )


#     @decorators.action(detail=False, methods=['delete'], url_path='delete/<int:id>', url_name='delete')
#     def delete(self, request):
#         instance = self.get_object()
#         if instance:
#             self.perform_destroy(instance)
#             return Response(
#                 {"message": "Notification supprimée avec succès"},
#                 status=status.HTTP_204_NO_CONTENT
#             )
#         return Response(
#             {"error": "Notification non trouvée"},
#             status=status.HTTP_404_NOT_FOUND
            
#         )




from rest_framework import viewsets, status, decorators
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Utilisateurs, Immobiliers, Types, Contrats, Paiements, Demandes, Notifications
from .serializers import UserSerializer, ImmobiliersSerializer, TypesSerializer, ContratsSerializer, PaiementsSerializer, DemandesSerializer, NotificationsSerializer
from django.contrib.auth.models import User
# from .tasks import verifier_paiements_retard


class UserViewSet(viewsets.ModelViewSet):
    queryset = Utilisateurs.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

    @decorators.action(detail=False, methods=['post'], url_path='signup')
    def signup(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Inscription réussie", "user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @decorators.action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        # verifier_paiements_retard()
        # print("fait")
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = Utilisateurs.objects.get(email=email)
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return Response({
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": user.role,
                    "is_superuser": user.is_superuser,
                }, status=status.HTTP_200_OK)
            return Response({"error": "Mot de passe incorrect"}, status=status.HTTP_400_BAD_REQUEST)
        except Utilisateurs.DoesNotExist:
            return Response({"error": "Utilisateur non trouvé"}, status=status.HTTP_404_NOT_FOUND)

    @decorators.action(detail=False, methods=['get'], url_path='verify-token', permission_classes=[IsAuthenticated])
    def verify_token(self, request):
        return Response({"valid": True, "user": {"username": request.user.username, "email": request.user.email, "role": request.user.role}})


class ImmobilierViewSet(viewsets.ModelViewSet):
    queryset = Immobiliers.objects.all()
    serializer_class = ImmobiliersSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'


class TypeViewSet(viewsets.ModelViewSet):
    queryset = Types.objects.all()
    serializer_class = TypesSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'


class ContratViewSet(viewsets.ModelViewSet):
    queryset = Contrats.objects.all()
    serializer_class = ContratsSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'


class PaiementViewSet(viewsets.ModelViewSet):
    queryset = Paiements.objects.all()
    serializer_class = PaiementsSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'


class DemandeViewSet(viewsets.ModelViewSet):
    queryset = Demandes.objects.all()
    serializer_class = DemandesSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

    @decorators.action(detail=True, methods=['patch'], url_path='accepter')
    def accepter(self, request, id=None):
        instance = self.get_object()
        if instance.statut != 'en_attente':
            return Response({"error": "Cette demande a déjà été traitée"}, status=status.HTTP_400_BAD_REQUEST)
        instance.statut = 'Acceptée'
        instance.save()
        return Response({"message": "Demande acceptée", "demande": self.get_serializer(instance).data})

    @decorators.action(detail=True, methods=['patch'], url_path='refuser')
    def refuser(self, request, id=None):
        instance = self.get_object()
        if instance.statut != 'en_attente':
            return Response({"error": "Cette demande a déjà été traitée"}, status=status.HTTP_400_BAD_REQUEST)
        instance.statut = 'Refusée'
        instance.save()
        return Response({"message": "Demande refusée", "demande": self.get_serializer(instance).data})


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notifications.objects.all()
    serializer_class = NotificationsSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'
