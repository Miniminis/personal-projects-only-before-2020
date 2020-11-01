"""nposition URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from user.views import HomeView, IndexView, RegisterView, LoginView
from lecture.views import LectureView, LectureDetailView
from contents.views import AnnouncementView, FAQView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', IndexView.as_view(), name='index'),
    path('register/', TemplateView.as_view(template_name='user/register.html'), name='register'),
    path('login/', TemplateView.as_view(template_name='user/login.html'), name='login'),
    path('lecture/', LectureView.as_view(), name='lecture'),
    path('lecture/detail', LectureDetailView.as_view(), name='lecture_detail'),    
    path('announce/', AnnouncementView.as_view(), name='announce'),
    path('faq/', FAQView.as_view(), name='faq'),

    path('apis/v1/home/', HomeView.as_view(), name='apis_v1_home'),
    path('apis/v1/user/register/', RegisterView.as_view(), name='apis_v1_user_register'),
    path('apis/v1/user/login/', LoginView.as_view(), name='apis_v1_user_login'),
]

# if settings.DEBUG: 
#     import debug_toolbar
#     urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
