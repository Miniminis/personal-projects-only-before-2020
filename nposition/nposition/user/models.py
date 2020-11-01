from django.db import models
from django.db.models.fields import BooleanField, CharField, TextField
from helpers.models import BaseModel

# Create your models here.
class User(BaseModel):
    name = models.CharField(verbose_name='이름', max_length=10)
    email = models.EmailField(verbose_name='이메일')
    phnum = models.CharField(verbose_name='휴대폰번호', max_length=12)
    pw = models.CharField(verbose_name='비밀번호', max_length=20)
    is_staff = BooleanField(verbose_name='스태프권한', default=False)
    is_lecturer = BooleanField(verbose_name='멘토권한', default=False)
    is_superuser = BooleanField(verbose_name='관리자권한', default=False)
    is_verified = BooleanField(verbose_name='본인인증여부', default=False)
    is_kakao = BooleanField(verbose_name='카카오 로그인 회원 여부', default=False)
    kakao_verify_id = CharField(verbose_name='카카오 토큰 아이디', max_length=100)

