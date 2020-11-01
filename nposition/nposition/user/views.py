from django.shortcuts import render
from django.views.generic import TemplateView
from django.core.validators import validate_email, ValidationError

from helpers.views import BaseView
from contents.models import Company, ProfitShare,Announcement, Agreement
from lecture.models import Lecturer, Lecture

from contents.serializers import CompanySerializer, AgreementSerializer


# top, footer 정보
class HomeView(BaseView):
    def get(self, request):
        company =  Company.objects.order_by('id').last()
        c_serializer = CompanySerializer(company)

        agreement = Agreement.objects.order_by('id').last()
        a_serializer = AgreementSerializer(agreement)  # many=True
        return self.response({'company_info' : c_serializer.data, 
                                'agreement' : a_serializer.data},
                                message='정상처리되었습니다')


# index page
class IndexView(TemplateView):
    template_name='index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['profits'] = ProfitShare.objects.order_by('-id')[:6]
        context['mentos'] = Lecturer.objects.all().order_by('-id')[:4]
        context['announcements'] = Announcement.objects.all().order_by('-id')[:4]
        return context


# 회원가입 
class RegisterView(BaseView):

    def post(self, request):
        email = request.POST.get('email', '')
        pw = request.POST.get('pw', '')
        re_pw = request.POST.get('re_pw', '')
        phnum = request.POST.get('phnum', '')
        try:
            validate_email(email)
        except:
            





# 로그인
class LoginView(TemplateView):
    pass


# 로그아웃
# 아이디찾기 
# 비밀번호찾기
# 정보수정(전체 내용 한번에 변경)