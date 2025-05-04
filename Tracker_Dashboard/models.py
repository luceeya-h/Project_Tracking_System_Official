from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, firstname, surname, regnum, password=None, role=None):
        if not email:
            raise ValueError("Users must have an email address")
    
        email = self.normalize_email(email)
        user = self.model(email=email, firstname=firstname, surname=surname, regnum=regnum, role=role,)
        user.set_password(password)
        user.save(using=self._db)
        return user
            
    def create_superuser(self, email, firstname, surname, regnum, password):
        user = self.create_user(email=email, firstname=firstname, surname=surname, password=password, role='admin',)
        user.is_staff = True 
        user.is_superuser = True
        user.save(using=self._db)
        return user
        
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    firstname = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    regnum = models.CharField(max_length=20, blank=True, null=True)
    role = models.CharField(max_length=255, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff =models.BooleanField(default=False)

    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'surname',]

    def __str__(self):
        return f"{self.firstname} {self.surname} ({self.email}) - Role: {self.role}"

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
