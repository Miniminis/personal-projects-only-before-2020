from django.db import models

# Create your models here.
class BaseModel(models.Model):
    created_at = models.DateTimeField(verbose_name='created time', auto_now_add=True)
    modified_at = models.DateTimeField(verbose_name='modified time', auto_now_add=True)

    class Meta:
        abstract = True
