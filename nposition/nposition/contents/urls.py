from django.urls import path
from .views import MentoView

urlpatterns = [
    path('mento/', MentoView.as_view(), name='mento'),
]
