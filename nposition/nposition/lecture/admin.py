from django.contrib import admin
from .models import Lecture, Lecturer

# Register your models here.
class LectureAdmin(admin.ModelAdmin):
    list_display=('lecturer', 'title', 'price', 'created_at', 'modified_at')
admin.site.register(Lecture, LectureAdmin)

class LecturerAdmin(admin.ModelAdmin):
    list_display=('name', 'description', 'kakao_id', 'created_at', 'modified_at')
admin.site.register(Lecturer, LecturerAdmin)
