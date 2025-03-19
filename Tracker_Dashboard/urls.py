from django.urls import path
from django.views.generic import TemplateView

from . import views    
from .views import CustomLoginView

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', TemplateView.as_view(template_name='login.html'), name='login'),
    path('register/', views.register_view, name='register'),
    path('forgot-password/', views.forgot_password_view, name='forgot_password'),
]
