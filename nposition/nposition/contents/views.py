from django.shortcuts import render
from django.views.generic import TemplateView

from .models import Company, Agreement, FAQ, ProfitShare, Announcement


''' 공지/이벤트 '''
# 공지/이벤트 리스트 
class AnnouncementView(TemplateView):
    template_name='etc/announcement.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['announcements'] = Announcement.objects.all().order_by('-id')[:10]
        return context


# 공지/이벤트 상세보기



''' 문의/FAQ ''' 
# 문의하기 채널 안내 내용


# FAQ 리스트
class FAQView(TemplateView):
    template_name='etc/faq.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['faqs'] = FAQ.objects.all().order_by('-id')[:10]
        return context
