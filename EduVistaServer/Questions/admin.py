from django.contrib import admin
from .models import Question, QuestionPaper, Subject, Standard, Chapter, Teacher, Topic, Option, CustomUser, Student
# Register your models here.

admin.site.register(Question)
admin.site.register(Subject)
admin.site.register(Standard)
admin.site.register(Chapter)
admin.site.register(Topic)
admin.site.register(Option)
admin.site.register(QuestionPaper)
admin.site.register(CustomUser)
admin.site.register(Student)
admin.site.register(Teacher)


# @admin.register(CustomUser)
# class CustomUserAdmin(admin.ModelAdmin):
#     list_display = ('username', 'email', 'is_staff', 'is_active')
#     list_filter = ('is_staff', 'is_active')
#     search_fields = ('username', 'email')
#     ordering = ('username',)