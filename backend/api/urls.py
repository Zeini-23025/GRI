from django.urls import path
from .views import SignupView, LoginView, UpdateUserView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/update/', UpdateUserView.as_view(), name='update_user'),
]
