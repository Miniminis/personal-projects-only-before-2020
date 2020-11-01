from django.shortcuts import render
from django.views.generic import TemplateView

from contents.models import Company, ProfitShare,Announcement, Agreement
from lecture.models import Lecturer, Lecture


# Create your views here.
''' user '''
# 회원가입 
# 로그인
# 로그아웃
# 아이디찾기 
# 비밀번호찾기
# 정보수정(전체 내용 한번에 변경)


# Create your views here.
class HomeView(TemplateView):
    template_name='index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['company_info'] = Company.objects.order_by('id').last()
        context['profits'] = ProfitShare.objects.order_by('-id')[:6]
        context['mentos'] = Lecturer.objects.all().order_by('-id')[:4]
        context['announcements'] = Announcement.objects.all().order_by('-id')[:4]
        context['agreement'] = Agreement.objects.all()
        return context


class RegisterView(TemplateView):
    pass


class LoginView(TemplateView):
    pass