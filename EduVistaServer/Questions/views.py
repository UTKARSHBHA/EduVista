from django.http import HttpResponse
from .models import Question, Chapter, Subject, Standard, Topic, Option
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from rest_framework import generics

from .serializers import QuestionSerializer, ChapterSerializer, SubjectSerializer, StandardSerializer, TopicSerializer, OptionSerializer


# for OptionsS
class OptionListCreate(generics.ListCreateAPIView):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

class OptionUpdateAPI(generics.UpdateAPIView):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    lookup_url_kwarg = 'id'
    
class OptionDeleteAPI(generics.DestroyAPIView):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    lookup_url_kwarg = 'id'

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=204)
class OptionListCreateById(generics.RetrieveAPIView):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    lookup_url_kwarg = 'id'


# for TopicS
class TopicListCreate(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class TopicUpdateAPI(generics.UpdateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    lookup_url_kwarg = 'id'
    
class TopicDeleteAPI(generics.DestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    lookup_url_kwarg = 'id'

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=204)
class TopicListCreateById(generics.RetrieveAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    lookup_url_kwarg = 'id'


# for STANDARDS
class StandardListCreate(generics.ListCreateAPIView):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer

class StandardUpdateAPI(generics.UpdateAPIView):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer
    lookup_url_kwarg = 'id'
    
class StandardDeleteAPI(generics.DestroyAPIView):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer
    lookup_url_kwarg = 'id'

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=204)
class StandardListCreateById(generics.RetrieveAPIView):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer
    lookup_url_kwarg = 'id'


# for Subjects
class SubjectListCreate(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class SubjectUpdateAPI(generics.UpdateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    lookup_url_kwarg = 'id'
    
class SubjectDeleteAPI(generics.DestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    lookup_url_kwarg = 'id'

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=204)
class SubjectListCreateById(generics.RetrieveAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    lookup_url_kwarg = 'id'

class QuestionListCreate(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class QuestionUpdateAPI(generics.UpdateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    lookup_url_kwarg = 'id'
    
class QuestionDeleteAPI(generics.DestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    lookup_url_kwarg = 'id'

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=204)
class QuestionListCreateById(generics.RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    lookup_url_kwarg = 'id'


# for CHAPTERS
class ChapterListCreate(generics.ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

class ChapterUpdateAPI(generics.UpdateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    lookup_url_kwarg = 'id'
    
class ChapterDeleteAPI(generics.DestroyAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    lookup_url_kwarg = 'id'

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=204)
class ChapterListCreateById(generics.RetrieveAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    lookup_url_kwarg = 'id'