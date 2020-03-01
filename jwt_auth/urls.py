from django.urls import path
from .views import RegisterView, LoginView, UserView, UserPartialUpdateView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user/<int:pk>', UserView.as_view()),
    path('user/partial_update/<int:pk>', UserPartialUpdateView.as_view())
]
