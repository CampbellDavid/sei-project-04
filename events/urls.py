from django.urls import path
from .views import EventListView, EventDetailView, ReviewListView, ReviewDetailView

urlpatterns = [
    path('', EventListView.as_view()),
    path('<int:pk>/', EventDetailView.as_view()),
    path('<int:pk>/reviews/', ReviewListView.as_view()),
    path('<int:pk>/reviews/<int:review_pk>/', ReviewDetailView.as_view())
]
