from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.

class HomeView(TemplateView):
    template_name='index.html'

class RegisterView(TemplateView):
    pass

class LoginView(TemplateView):
    pass

class MentoView(TemplateView):
    template_name='mento/mento.html'

