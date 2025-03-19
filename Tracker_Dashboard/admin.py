from django.contrib import admin
from .models import Authentication

@admin.register(Authentication)
class AuthenticationAdmin(admin.ModelAdmin):
    list_display = ('email', 'firstname', 'surname', 'regnum')
    search_fields = ('email', 'firstname', 'surname', 'regnum')
