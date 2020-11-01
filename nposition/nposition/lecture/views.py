from django.shortcuts import render
from django.views.generic import TemplateView

from .models import Lecture, Lecturer


# Create your views here.
''' lecture '''
# 강의 리스트
# 강의 상세
    # 강의 상세 내용
    # 강의 후기 리스트 (최신순 5개)
    # 강의 qna 리스트(최신순 5개)
    # 강의 qna 답글 리스트 
# 강의 결제

class LectureView(TemplateView):
    template_name='lecture/lecture.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['lectures'] = Lecture.objects.all().order_by('-id')
        return context

class LectureDetailView(TemplateView):
    template_name='lecture/lecture_detail.html'