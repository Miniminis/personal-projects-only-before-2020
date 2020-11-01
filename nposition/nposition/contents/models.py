import os
import uuid

from django.db import models
from helpers.models import BaseModel

# Create your models here.
""" 
회사관련정보
"""
BOARD_TYPE_CHOICES = [
    ('AN', '공지사항'),
    ('EV', '이벤트')
]

class Company(BaseModel):
    name = models.CharField(max_length=500)
    address = models.TextField()
    ceo = models.CharField(max_length=20)
    tel_num = models.IntegerField()
    email = models.EmailField()
    busin_num = models.IntegerField()
    kakao_id = models.CharField(max_length=20)

class Agreement(BaseModel):
    service_usage = models.URLField()
    personal_info = models.URLField()
    unique_info = models.URLField()
    paid_service = models.URLField()
    marketing = models.URLField()

class FAQ(BaseModel):
    title = models.CharField(max_length=200)
    content = models.TextField()

def image_upload_to(instance, filename):
    ext = filename.split('.')[-1]
    return os.path.join(instance.UPLOAD_PATH, "%s.%s" %(uuid.uuid4(), ext))

class ProfitShare(BaseModel):
    UPLOAD_PATH = 'admin_upload'

    image = models.ImageField(upload_to=image_upload_to)
    content = models.TextField()

class Announcement(BaseModel):
    writer = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    content = models.TextField()
    view_cnt = models.IntegerField(default=0)
    type = models.CharField(max_length=2, choices=BOARD_TYPE_CHOICES, default='AN')
