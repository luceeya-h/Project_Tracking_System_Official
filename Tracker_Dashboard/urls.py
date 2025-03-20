from django.urls import path
from django.views.generic import TemplateView

from . import views    
from .views import CustomLoginView

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', TemplateView.as_view(template_name='login.html'), name='login'),
    path('register/', views.register_view, name='register'),
    path('forgot-password/', views.forgot_password_view, name='forgot_password'),
    path('student-view/', views.student_view, name='student_view'),
    path('chatroom/', views.chatroom, name='chatroom'),
    path('progress/', views.progress, name='progress'),
    path('library/', views.library, name='library'),
    path('whiteboard/', views.whiteboard, name='whiteboard'),
    path('tasks/', views.tasks, name='tasks'),
    path('calendar/', views.calendar, name='calendar'),
    path('stickywall/', views.stickywall, name='stickywall'),
    path('upcoming/', views.upcoming, name='upcoming'),
    path('settings/', views.settings, name='settings'),
]
