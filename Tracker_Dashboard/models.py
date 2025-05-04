from django.db import models
from django.core.exceptions import ValidationError

class Authentication(models.Model):
    email = models.EmailField(unique=True)
    firstname = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    regnum = models.CharField(max_length=20, blank=True, null=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.firstname} {self.surname} ({self.email}) - Role: {self.role}"

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
    
    def save(self, *args, **kwargs):
        self.clean()
        super(Authentication, self).save(*args, **kwargs)
