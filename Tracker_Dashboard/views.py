from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.views import LoginView
from django.contrib import messages
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from .models import CustomUser
from django.contrib.auth import get_user_model

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the Tracker_Dashboard index.")

class CustomLoginView(LoginView):
    template_name = 'login.html'
    redirect_authenticated_user = True
    
    def form_invalid(self, form):
        messages.error(self.request, "Invalid email or password.")
        return super().form_invalid(form)

    
def custom_login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user = CustomUser.objects.get(email=email)
            if check_password(password, user.password):
                request.session['user_id'] = user.id
                request.session['user_role'] = user.role
                request.session['user_name'] = f"{user.firstname} {user.surname}"

                if user.role == 'student':
                    return redirect('home')  # student dashboard
                elif user.role == 'supervisor':
                    return redirect('dashboard')  # supervisor dashboard
                else:
                    messages.error(request, "Unknown role.")
                    return redirect('login')
            else:
                messages.error(request, "Invalid email or password.")
        except CustomUser.DoesNotExist:
            messages.error(request, "User not found.")
    return render(request, 'login.html')

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

        # Role detection
        if reg_number:
            role = "student"
        elif email:
            username = email.split('@')[0]
            if not any(char.isdigit() for char in username):
                role = "supervisor"
            else:
                role = "student"
        else:
            role = "unknown"

        try:
            CustomUser.objects.create(
                firstname=fullname,
                surname=surname,
                regnum=reg_number,
                email=email,
                password=make_password(password),  # Only hash this one
                role=role
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

def chatroom(request):
    return render(request, 'chatroom.html')

def progress(request):
    return render(request, 'progress.html')

def library(request):
    return render(request, 'library.html')

def settings(request):
    return render(request, 'settings.html')

def settings_super(request):
    return render(request, 'settings_super.html')

def check_user(request):
    if request.method == 'POST':
        import json
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        try:
            user = CustomUser.objects.get(email=email)
            if check_password(password, user.password):
                return JsonResponse({'exists': True})
        except CustomUser.DoesNotExist:
            pass

    return JsonResponse({'exists': False})

@login_required
def home(request):
    return render(request, 'home.html')

@login_required
def dashboard(request):
    return render(request, 'dashboard.html')

def documentation(request):
    return render(request, 'documentation.html')

def group_collaboration(request):
    return render(request, 'group_collaboration.html')

def reports(request):
    return render(request, 'reports.html')

def reports_super(request):
    return render(request, 'reports_super.html')

def student_groups(request):
    return render(request, 'student-groups.html')

def review(request):
    return render(request, 'review.html')

def evaluation(request):
    return render(request, 'evaluation.html')

