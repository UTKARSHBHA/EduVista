import datetime
import random
import string
from django.conf import settings
from django.db import models
# from django.contrib.auth.models import User

from django.utils.crypto import get_random_string
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission



class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not username:
            raise ValueError('The Username field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, username, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    role = models.CharField(max_length=20, choices=(
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('hod', 'HOD'),
        ('organization', 'Organization'),
        ('provider', 'Provider'),
    ))

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

class Subject(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Standard(models.Model):
    name = models.CharField(max_length=100)
    subjects = models.ManyToManyField(Subject, related_name='standards')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


    def __str__(self):
        return self.name


class Chapter(models.Model):
    name = models.CharField(max_length=100)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Topic(models.Model):
    name = models.CharField(max_length=100)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    

class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Question(models.Model):
    TYPE_CHOICES = [
        ('mcq', 'Multiple Choice Question'),
        ('tf', 'True or False'),
        ('descriptive', 'Descriptive'),
    ]
    type = models.CharField(max_length=11, choices=TYPE_CHOICES)
    DIFFICULTY_CHOICES = [
        ('hard', 'Hard'),
        ('medium', 'Medium'),
        ('easy', 'Easy'),
    ]
    difficulty_level = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    standard = models.ForeignKey(Standard, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    marks = models.IntegerField()
    topics = models.ManyToManyField(Topic, related_name='questions')
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    question_text = models.TextField()
    image = models.ImageField(upload_to='questions-images/', blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name='questions')

    def __str__(self):
        return self.question_text

class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    text = models.TextField()
    is_correct = models.BooleanField(default=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.text
    

class PasswordResetToken(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        if not self.token:
            self.token = get_random_string(length=32)
        return super().save(*args, **kwargs)
    

class QuestionPaper(models.Model):
    standard = models.ForeignKey(Standard, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, blank=True, null=True)
    topics = models.ManyToManyField(Topic, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)

    question_paper_json = models.JSONField()
    total_marks = models.IntegerField()
    question_count = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True) # Automatically set when the object is first created
    updated_at = models.DateTimeField(auto_now=True) # Automatically updated every time the object is saved
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.standard.name} - {self.subject.name} - {self.chapter.name if self.chapter else 'No Chapter'}"
    

def generate_registration_number():
    # Define the format for the registration number (e.g., prefix + random string + year)
    prefix = "REG-"
    year = str(datetime.date.today().year)[2:]  # Get the last two digits of the current year
    random_string = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(8))
    return f"{prefix}{random_string}{year}"

class Student(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Foreign key to User model

    # Basic Details
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True)

    # Contact Information
    phone_number = models.CharField(max_length=15)
    alternate_phone_number = models.CharField(max_length=15, blank=True)

    # Demographic Information
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=(('M', 'Male'), ('F', 'Female'), ('O', 'Other')))

    # Enrollment Information
    registration_number = models.CharField(max_length=20, unique=True, default=generate_registration_number)
    admission_date = models.DateField()

    # Address Information (Optional)
    address_line1 = models.CharField(max_length=100)
    address_line2 = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=10)
    country = models.CharField(max_length=30)

    # Additional Information (Optional)
    profile_picture = models.ImageField(upload_to='student_profile_pics/', blank=True , null=True)
    parent_guardian_name = models.CharField(max_length=100)
    parent_guardian_contact = models.CharField(max_length=15)
    parent_guardian_email = models.EmailField()
    emergency_contact_name = models.CharField(max_length=100)
    emergency_contact_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.registration_number})"
    

class Teacher(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Foreign key to User model
    
    # Basic Details
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True)
    
    # Contact Information
    phone_number = models.CharField(max_length=15)
    alternate_phone_number = models.CharField(max_length=15, blank=True)
    
    # Demographic Information
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=(('M', 'Male'), ('F', 'Female'), ('O', 'Other')))
    
    # Employment Information
    designation = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    joining_date = models.DateField()
    
    # Address Information (Optional)
    address_line1 = models.CharField(max_length=100)
    address_line2 = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=10)
    country = models.CharField(max_length=30)
    
    # Additional Information (Optional)
    profile_picture = models.ImageField(upload_to='teacher_profile_pics/', blank=True, null=True)
    biography = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.designation})"


class EntranceTest(models.Model):
    EXAM_TYPE_CHOICES = [
        ('descriptive', 'Descriptive'),
        ('objective', 'Objective'),
        ('both', 'Both'),
    ]
    
    subject = models.ForeignKey(Subject, related_name='subject_tests', on_delete=models.CASCADE)
    standard = models.ForeignKey(Standard, related_name='standard_tests', on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    exam_type = models.CharField(max_length=11, choices=EXAM_TYPE_CHOICES)
    registration_fee = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    location = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.subject.name} - {self.standard.name} - {self.date} - {self.start_time} to {self.end_time}"
