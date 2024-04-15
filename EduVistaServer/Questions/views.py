from rest_framework import viewsets

# Import your serializers
from .serializers import QuestionSerializer, ChapterSerializer, SubjectSerializer, StandardSerializer, TopicSerializer, OptionSerializer

# Import your models
from .models import Question, Chapter, Subject, Standard, Topic, Option

from rest_framework.parsers import MultiPartParser, FormParser


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    print(queryset)
    serializer_class = QuestionSerializer
    parser_classes = [MultiPartParser, FormParser]

class ChapterViewSet(viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

class StandardViewSet(viewsets.ModelViewSet):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer