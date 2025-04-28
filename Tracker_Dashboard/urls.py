from django.urls import path
from django.views.generic import TemplateView

from . import views    
from .views import check_user

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', TemplateView.as_view(template_name='login.html'), name='login'),
    path('register/', views.register_view, name='register'),
    path('forgot-password/', views.forgot_password_view, name='forgot_password'),
    path('home/', views.home, name='home'),
    path('documentation/', views.documentation, name='documentation'),
    path('group-collaboration/', views.group_collaboration, name='group_collaboration'),
    path('reports/', views.reports, name='reports'),
    path('chatroom/', views.chatroom, name='chatroom'),
    path('progress/', views.progress, name='progress'),
    path('library/', views.library, name='library'),
    path('settings/', views.settings, name='settings'), 
    path('dashboard/', views.dashboard, name='dashboard'), 
    path('student-groups/', views.student_groups, name='student_groups'), 
    path('review/', views.review, name='review'),
    path('evaluation/', views.evaluation, name='evaluation'),
]
