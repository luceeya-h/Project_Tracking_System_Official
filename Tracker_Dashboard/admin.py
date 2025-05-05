from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from django.forms import ModelForm

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'firstname', 'surname', 'role', 'is_staff')
    list_filter = ('role', 'is_staff', 'is_active')
    fieldsets =( 
                (None, {'fields':('email', 'password')}), 
                ('Personal Info', {'fields':('firstname', 'surname', 'role')}),
                ('Permissions', {'fields':('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions' )}),
                ) 
    add_fieldsets = ((None, {'classes': ('wide',),'fields': ('email', 'firstname', 'surname', 'role', 'password1', 'password2', 'is_staff', 'is_active'),}),
                    )
    search_fields = ('email', 'firstname', 'surname',)
    ordering = ('email',)