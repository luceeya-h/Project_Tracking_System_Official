import os
from django.conf import settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Project_Tracking_System_Official.settings')
from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    groups = models.ManyToManyField('Group', 
                                    related_name= 'customuser_set',
                                    blank=True,)
    user_permissions = models.ManyToManyField(
        'Permission',
        related_name= 'customuser_set',
        blank= True
    )
    def create_user(self, email, firstname, surname, regnum, password=None, role=None):
        if not email:
            raise ValueError("Users must have an email address")
    
        email = self.normalize_email(email)
        user = self.model(email=email, firstname=firstname, surname=surname, regnum=regnum, role=role,)
        user.set_password(password)
        user.save(using=self._db)
        return user
            
    def create_superuser(self, email, firstname, surname, regnum, password):
        user = self.create_user(email=email, firstname=firstname, regnum=regnum, surname=surname, password=password, role='admin',)
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
    REQUIRED_FIELDS = ['firstname', 'surname', 'regnum']

    def __str__(self):
        return f"{self.firstname} {self.surname} ({self.email}) - Role: {self.role}"

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

# Tracker_Dashboard for the project 

class Project(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('corrections_needed', 'Corrections Needed'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_projects')
    supervisor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='supervised_projects')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.status})"
    
# Tracker_Dashboard chapter submission model

class ChapterSubmission(models.Model):
    STATUS_CHOICES = [
        ('submitted', 'Submitted'),
        ('reviewed', 'Reviewed'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('corrections_needed', 'Corrections Needed'),
        ('resubmitted', 'Resubmitted'),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='chapters')
    chapter_title = models.CharField(max_length=100)
    file = models.FileField(upload_to='chapters/')
    feedback = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='submitted')
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.chapter_title} - {self.project.title}"


# Tracker_Dashboard feedback model

class Feedback(models.Model):
    chapter = models.ForeignKey(ChapterSubmission, on_delete=models.CASCADE, related_name='feedback_entries')
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback by {self.sender.email} on {self.chapter.chapter_title}"


# Tracker_Dashboard chatroom model

class ChatMessage(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='received_messages')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender.email} → {self.receiver.email}: {self.message[:30]}"
    

# Tracker_Dashboard progress what what

class ProgressReport(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    chapter = models.CharField(max_length=100)  # e.g., "Chapter 1", "Chapter 2"
    status_choices = [
        ('pending', 'Pending'),
        ('submitted', 'Submitted'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    status = models.CharField(max_length=10, choices=status_choices, default='pending')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.student.email} - {self.chapter} [{self.status}]"

# Tracker_Dashboard uploading documents... lalalala

class ChapterUpload(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    chapter_title = models.CharField(max_length=100)
    file = models.FileField(upload_to='chapters/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.email} - {self.chapter_title}"


# Tracker_Dashboard feedbacks for chapter upload

class ChapterFeedback(models.Model):
    chapter = models.ForeignKey(ChapterUpload, on_delete=models.CASCADE, related_name='feedbacks')
    supervisor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'supervisor'})
    feedback_text = models.TextField()
    is_approved = models.BooleanField(default=False)
    feedback_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback by {self.supervisor.email} on {self.chapter.chapter_title}"


# Tracker_Dashboard tracking ama settings 

class ProgressTracker(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    progress_percentage = models.FloatField(default=0.0)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.student.email} - {self.progress_percentage}%"

