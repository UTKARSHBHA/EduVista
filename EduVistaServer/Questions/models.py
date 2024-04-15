from django.db import models

class Subject(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Standard(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Topic(models.Model):
    name = models.CharField(max_length=100)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Chapter(models.Model):
    name = models.CharField(max_length=100)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)

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
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
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

