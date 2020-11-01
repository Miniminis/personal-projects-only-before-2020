from django.db import models
from helpers.models import BaseModel

# Create your models here.
class Lecturer(BaseModel):
    name = models.CharField(max_length=50)
    description = models.TextField()
    kakao_id = models.CharField(max_length=20)

    def __str__(self):
        return self.name

        
class Lecture(BaseModel):
    lecturer = models.ForeignKey(Lecturer, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)    
    content = models.TextField()
    price = models.IntegerField(default=0)
    # start_date = models.DateTimeField()
    # end_date = models.DateTimeField()

