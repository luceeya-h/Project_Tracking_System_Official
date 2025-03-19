from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.views import LoginView

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the Tracker_Dashboard index.")

class CustomLoginView(LoginView):
    template_name = 'login.html'
    redirect_authenticated_user = True

def register_view(request):
    context = {'css_class': 'registration-page'}
    return render(request, 'registration.html', context)

def forgot_password_view(request):
    context = {'css_class': 'forgot-password-page'}
    return render(request, 'forgot_password.html', context)