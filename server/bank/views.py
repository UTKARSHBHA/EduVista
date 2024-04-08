from rest_framework import generics
from .models import Subject, Standard, Topic, Chapter, Question, Option
from .serializers import SubjectSerializer, StandardSerializer,  TopicSerializer, ChapterSerializer, QuestionSerializer, OptionSerializer

class SubjectListCreateView(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class StandardListCreateView(generics.ListCreateAPIView):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer

class TopicListCreateView(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class ChapterListCreateView(generics.ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

class QuestionListCreateView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class OptionListCreateView(generics.ListCreateAPIView):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer


# delete 

class SubjectDeleteView(generics.DestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class StandardDeleteView(generics.DestroyAPIView):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer

class TopicDeleteView(generics.DestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class ChapterDeleteView(generics.DestroyAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

class QuestionDeleteView(generics.DestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class OptionDeleteView(generics.DestroyAPIView):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer