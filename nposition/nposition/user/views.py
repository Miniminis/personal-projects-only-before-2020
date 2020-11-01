from django.shortcuts import render
from django.views.generic import TemplateView

from helpers.views import BaseView
from contents.models import Company, ProfitShare,Announcement, Agreement
from lecture.models import Lecturer, Lecture

from contents.serializers import CompanySerializer, AgreementSerializer

# Create your views here. 
''' user '''
# 회원가입 
# 로그인
# 로그아웃
# 아이디찾기 
# 비밀번호찾기
# 정보수정(전체 내용 한번에 변경)


# top, footer 정보
class HomeView(BaseView):
    def get(self, request):
        company =  Company.objects.order_by('id').last()
        c_serializer = CompanySerializer(company)

        agreement = Agreement.objects.order_by('id').last()
        a_serializer = AgreementSerializer(agreement)  # many=True
        return self.response({'company_info' : c_serializer.data, 
                                'agreement' : a_serializer.data})


# index page
class IndexView(TemplateView):
    template_name='index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['profits'] = ProfitShare.objects.order_by('-id')[:6]
        context['mentos'] = Lecturer.objects.all().order_by('-id')[:4]
        context['announcements'] = Announcement.objects.all().order_by('-id')[:4]
        return context



class RegisterView(TemplateView):
    pass


class LoginView(TemplateView):
    pass