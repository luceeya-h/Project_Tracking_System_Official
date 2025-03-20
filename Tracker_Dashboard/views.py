from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.views import LoginView
from django.contrib import messages
from .models import Authentication

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the Tracker_Dashboard index.")

class CustomLoginView(LoginView):
    template_name = 'login.html'
    redirect_authenticated_user = True

def register_view(request):
    if request.method == 'POST':
        fullname = request.POST.get('fullname')
        surname = request.POST.get('surname')
        reg_number = request.POST.get('reg_number')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return render(request, 'registration.html')

        try:
            Authentication.objects.create(
                firstname=fullname,
                surname=surname,
                regnum=reg_number,
                email=email,
                password=password,
                confirm_password=confirm_password,
                role='student'
            )
            messages.success(request, "Registration successful!")
            return redirect('login')
        except Exception as e:
            messages.error(request, f"Error: {e}")
            return render(request, 'registration.html')

    return render(request, 'registration.html')

def forgot_password_view(request):
    context = {'css_class': 'forgot-password-page'}
    return render(request, 'forgot_password.html', context)