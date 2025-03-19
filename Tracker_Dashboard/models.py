from django.db import models
from django.core.exceptions import ValidationError

class Authentication(models.Model):
    email = models.EmailField(unique=True)  # Parent element
    firstname = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    regnum = models.CharField(max_length=20, unique=True)  # Registration number
    password = models.CharField(max_length=128)  # Store hashed passwords
    confirm_password = models.CharField(max_length=128)  # For validation purposes only
    role = models.CharField(max_length=255, blank=True, null=True)


    def clean(self):
        # Ensure password and confirm_password match
        if self.password != self.confirm_password:
            raise ValidationError("Passwords do not match.")
    
    def save(self, *args, **kwargs):
        # Call clean method before saving
        self.clean()
        super(Authentication, self).save(*args, **kwargs)

    def __str__(self):
        return self.email
