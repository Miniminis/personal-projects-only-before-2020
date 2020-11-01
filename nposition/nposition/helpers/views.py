from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class BaseView(View):
    
    @staticmethod
    def response(data={}, message='정상처리되었습니다.', status=200):
        result = {
            'data': data,
            'message': message,
        }
        return JsonResponse(result, status=status)