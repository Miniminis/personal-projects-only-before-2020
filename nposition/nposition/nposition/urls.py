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

from user.views import HomeView, RegisterView, LoginView
from lecture.views import LectureView, LectureDetailView
from contents.views import AnnouncementView, FAQView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', HomeView.as_view(), name='home'),
    path('register/', RegisterView.as_view(template_name='user/register.html'), name='register'),
    path('login/', LoginView.as_view(template_name='user/login.html'), name='login'),

    path('v1/lecture/', LectureView.as_view(), name='lecture'),
    path('v1/lecture/detail', LectureDetailView.as_view(), name='lecture_detail'),
    path('v1/announce/', AnnouncementView.as_view(), name='announce'),
    path('v1/faq/', FAQView.as_view(), name='faq'),
]

# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
