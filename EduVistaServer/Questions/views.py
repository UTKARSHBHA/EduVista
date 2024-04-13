from django.http import HttpResponse
from .models import Question
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from rest_framework import generics

from .serializers import QuestionSerializer



class QuestionListCreate(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

def index(request):
    latest_question_list = Question.objects.all()
    return HttpResponse(latest_question_list)

def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)


def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)

