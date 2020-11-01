from django.contrib import admin
from .models import Company, Agreement, FAQ, ProfitShare, Announcement

# Register your models here.
class CompanyAdmin(admin.ModelAdmin):
    list_display =('name', 'address', 'ceo', 'created_at', 'modified_at')
admin.site.register(Company, CompanyAdmin)

class AgreementAdmin(admin.ModelAdmin):
    list_display =('id', 'created_at', 'modified_at')
admin.site.register(Agreement, AgreementAdmin)

class FAQAdmin(admin.ModelAdmin):
    list_display=('title', 'created_at', 'modified_at')
admin.site.register(FAQ, FAQAdmin)

class ProfitShareAdmin(admin.ModelAdmin):
    list_display=('image', 'content', 'created_at', 'modified_at')
admin.site.register(ProfitShare, ProfitShareAdmin)

class AnnoucementAdmin(admin.ModelAdmin):
    list_display=('writer', 'title', 'type', 'created_at', 'modified_at')
admin.site.register(Announcement, AnnoucementAdmin)

