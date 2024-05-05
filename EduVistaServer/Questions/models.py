from django.db import models
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.contrib.postgres.fields import JSONField


class Subject(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Standard(models.Model):
    name = models.CharField(max_length=100)
    subjects = models.ManyToManyField(Subject, related_name='standards')

    def __str__(self):
        return self.name


class Chapter(models.Model):
    name = models.CharField(max_length=100)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Topic(models.Model):
    name = models.CharField(max_length=100)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)

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

    def __str__(self):
        return self.question_text

class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    text = models.TextField()
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
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
    question_paper_json = models.JSONField()
    total_marks = models.IntegerField()
    question_count = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True) # Automatically set when the object is first created
    updated_at = models.DateTimeField(auto_now=True) # Automatically updated every time the object is saved

    def __str__(self):
        return f"{self.standard.name} - {self.subject.name} - {self.chapter.name if self.chapter else 'No Chapter'}"