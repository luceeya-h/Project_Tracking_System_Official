from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.views import LoginView
from django.contrib import messages
from django.contrib.auth.hashers import check_password
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

def student_view(request):
    return render(request, 'student_view.html')

def chatroom(request):
    return render(request, 'chatroom.html')

def progress(request):
    return render(request, 'progress.html')

def library(request):
    return render(request, 'library.html')

def whiteboard(request):
    return render(request, 'whiteboard.html')

def tasks(request):
    return render(request, 'tasks.html')

def calendar(request):
    return render(request, 'calendar.html')

def stickywall(request):
    return render(request, 'stickywall.html')

def upcoming(request):
    return render(request, 'upcoming.html')

def settings(request):
    return render(request, 'settings.html')

def check_user(request):
    if request.method == 'POST':
        import json
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        try:
            user = Authentication.objects.get(email=email)
            if check_password(password, user.password):
                return JsonResponse({'exists': True})
        except Authentication.DoesNotExist:
            pass

    return JsonResponse({'exists': False})