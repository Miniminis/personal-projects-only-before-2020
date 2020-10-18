from django.db import models
from helpers.models import BaseModel

# Create your models here.
class Company(BaseModel):
    name = models.CharField(max_length=500)
    address = models.TextField()
    ceo = models.CharField(max_length=20)
    tel_num = models.IntegerField()
    email = models.EmailField()
    busin_num = models.IntegerField()
    kakao_id = models.CharField(max_length=20)