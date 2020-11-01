from django import forms 
from .models import UserModel

class RegisterForm(forms.ModelForm):
    email = forms.EmailField(max_length=64, label='이메일')
    password = forms.CharField(widget=forms.PasswordInput, label='비밀번호')
    re_password = forms.CharField(widget=forms.PasswordInput, label='비밀번호 확인')
    phnum = forms.CharField(max_length=12, label='휴대폰번호')

    