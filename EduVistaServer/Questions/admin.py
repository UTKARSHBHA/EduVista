from django.contrib import admin
from .models import Question, QuestionPaper, Subject, Standard, Chapter, Topic, Option
# Register your models here.

admin.site.register(Question)
admin.site.register(Subject)
admin.site.register(Standard)
admin.site.register(Chapter)
admin.site.register(Topic)
admin.site.register(Option)
admin.site.register(QuestionPaper)
