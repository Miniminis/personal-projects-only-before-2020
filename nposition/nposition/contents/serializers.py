from rest_framework import serializers
from .models import Company, Agreement


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = '__all__'


class AgreementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Agreement
        fields = '__all__'