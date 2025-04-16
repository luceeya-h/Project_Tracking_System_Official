from django import forms
from .models import User

class RegistrationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'surname', 'email', 'registration_number')

    def clean_email(self):
        email = self.cleaned_data['email']
        if email.startswith('REG'):  # assuming registration numbers start with 'REG'
            self.cleaned_data['role'] = 'student'
        elif email.startswith('TN'):  # assuming teacher names start with 'TN'
            self.cleaned_data['role'] = 'supervisor'
        return email
