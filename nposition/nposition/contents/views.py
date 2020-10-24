from django.shortcuts import render
from django.views.generic import TemplateView

from .models import Company, Agreement, FAQ, ProfitShare, Lecturer, Announcement

# Create your views here.
class HomeView(TemplateView):
    template_name='index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['company_info'] = Company.objects.order_by('created_at').last()
        context['mentos'] = Lecturer.objects.all().order_by('-id')[:4]
        context['announcements'] = Announcement.objects.all().order_by('-id')[:4]
        context['agreement'] = Agreement.objects.all()
        return context


class RegisterView(TemplateView):
    pass


class LoginView(TemplateView):
    pass


class LectureView(TemplateView):
    template_name='lecture/lecture.html'


class AnnouncementView(TemplateView):
    template_name='etc/announcement.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['announcements'] = Announcement.objects.all().order_by('-id')[:10]
        return context
    

class FAQView(TemplateView):
    template_name='etc/faq.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['faqs'] = FAQ.objects.all().order_by('-id')[:10]
        return context


''' TO BE DELETED '''
class MentoView(TemplateView):
    template_name='mento/mento.html'

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

class EventView(TemplateView):
    template_name='etc/event.html'
