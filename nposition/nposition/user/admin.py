from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'is_staff', 'is_lecturer', 'is_superuser', 'is_verified', 'is_kakao')
admin.site.register(User, UserAdmin)