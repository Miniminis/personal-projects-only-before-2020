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

class LectureView(TemplateView):
    template_name='lecture/lecture.html'

class MenteeWelcomeView(TemplateView):
    template_name='mentee/welcome.html'

class MenteeProfitAuthView(TemplateView):
    template_name='mentee/profit_auth.html'

class MenteeProductRecommView(TemplateView):
    template_name='mentee/product_recomm.html'

class MenteeQnAView(TemplateView):
    template_name='mentee/q_and_a.html'

class MenteeBoardView(TemplateView):
    template_name='mentee/board.html'

class AnnouncementView(TemplateView):
    template_name='etc/announcement.html'

# class EventView(TemplateView):
#     template_name='etc/event.html'

class FAQView(TemplateView):
    template_name='etc/faq.html'
