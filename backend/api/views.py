from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from django.contrib.auth.models import User 
from .serializers import *
from rest_framework import status



class SignupView(generics.CreateAPIView):
    """
    Vue pour permettre à un utilisateur de s'inscrire.
    """
    queryset = Utilisateurs.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


    # def post(self, request):
    #     serializer = UserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(
    #             {"message": "User created successfully!"},
    #             status=status.HTTP_201_CREATED
    #         )
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
                        "username": user.username,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "role": user.role,
                    },
                    status=status.HTTP_200_OK
                )
            return Response(
                {"error": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Utilisateurs.DoesNotExist:
            return Response(
                {"error": "User does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )

class ListUsers(generics.ListAPIView):
    queryset = Utilisateurs.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    
class UpdateUserView(APIView):
    """
    Vue pour permettre à un utilisateur connecté de modifier ses informations.
    """
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User information updated successfully!"},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateImmobilier(generics.CreateAPIView):
    queryset = Immobiliers.objects.all()
    serializer_class = ImmobiliersSerializer
    permission_classes = [AllowAny]

class UpdateImmobilier(generics.UpdateAPIView):
    queryset = Immobiliers.objects.all()
    serializer_class = ImmobiliersSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class DeleteImmobilier(generics.DestroyAPIView):
    queryset = Immobiliers.objects.all()
    serializer_class = ImmobiliersSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class ListImmobiliers(generics.ListAPIView):
    queryset = Immobiliers.objects.all()
    serializer_class = ImmobiliersSerializer
    permission_classes = [AllowAny]

class RetrieveImmobilier(generics.RetrieveAPIView):
    queryset = Immobiliers.objects.all()
    serializer_class = ImmobiliersSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

# Vues pour Types
class CreateType(generics.CreateAPIView):
    queryset = Types.objects.all()
    serializer_class = TypesSerializer
    permission_classes = [AllowAny]

class UpdateType(generics.UpdateAPIView):
    queryset = Types.objects.all()
    serializer_class = TypesSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class DeleteType(generics.DestroyAPIView):
    queryset = Types.objects.all()
    serializer_class = TypesSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class ListTypes(generics.ListAPIView):
    queryset = Types.objects.all()
    serializer_class = TypesSerializer
    permission_classes = [AllowAny]

class RetrieveType(generics.RetrieveAPIView):
    queryset = Types.objects.all()
    serializer_class = TypesSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'



# Vues pour Contrats
class CreateContrat(generics.CreateAPIView):
    queryset = Contrats.objects.all()
    serializer_class = ContratsSerializer
    permission_classes = [AllowAny]

class UpdateContrat(generics.UpdateAPIView):
    queryset = Contrats.objects.all()
    serializer_class = ContratsSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class DeleteContrat(generics.DestroyAPIView):
    queryset = Contrats.objects.all()
    serializer_class = ContratsSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class ListContrats(generics.ListAPIView):
    queryset = Contrats.objects.all()
    serializer_class = ContratsSerializer
    permission_classes = [AllowAny]

class RetrieveContrat(generics.RetrieveAPIView):
    queryset = Contrats.objects.all()
    serializer_class = ContratsSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'


# Vues pour Paiements
class CreatePaiement(generics.CreateAPIView):
    queryset = Paiements.objects.all()
    serializer_class = PaiementsSerializer
    permission_classes = [AllowAny]

class UpdatePaiement(generics.UpdateAPIView):
    queryset = Paiements.objects.all()
    serializer_class = PaiementsSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class DeletePaiement(generics.DestroyAPIView):
    queryset = Paiements.objects.all()
    serializer_class = PaiementsSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class ListPaiements(generics.ListAPIView):
    queryset = Paiements.objects.all()
    serializer_class = PaiementsSerializer
    permission_classes = [AllowAny]

class RetrievePaiement(generics.RetrieveAPIView):
    queryset = Paiements.objects.all()
    serializer_class = PaiementsSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'
class VerifyTokenView(APIView):
    """
    Vue pour vérifier la validité du token JWT.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "valid": True,
            "user": {
                "username": request.user.username,
                "email": request.user.email,
                "role": request.user.role
            }
        })
