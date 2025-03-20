from django.contrib import admin
from .models import Authentication

@admin.register(Authentication)
class AuthenticationAdmin(admin.ModelAdmin):
    list_display = ('firstname', 'surname', 'email', 'regnum', 'role')
    search_fields = ('firstname', 'surname', 'email', 'regnum')
    list_filter = ('role',)
