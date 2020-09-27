from django.urls import path
from .views import (MentoView, 
                    LectureView, 
                    MenteeWelcomeView, MenteeProfitAuthView, MenteeProductRecommView, 
                    MenteeBoardView, MenteeQnAView,
                    AnnouncementView, EventView, FAQView)


urlpatterns = [
    path('mento/', MentoView.as_view(), name='mento'),

    path('lecture/', LectureView.as_view(), name='lecture'),

    path('mentee/welcome', MenteeWelcomeView.as_view(), name='welcome'),
    path('mentee/profit', MenteeProfitAuthView.as_view(), name='profit'),
    path('mentee/product', MenteeProductRecommView.as_view(), name='product'),
    path('mentee/qna', MenteeQnAView.as_view(), name='qna'),
    path('mentee/board', MenteeBoardView.as_view(), name='board'),

    path('announce/', AnnouncementView.as_view(), name='announce'),
    path('event/', EventView.as_view(), name='event'),
    path('faq/', FAQView.as_view(), name='faq'),
]
