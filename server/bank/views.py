from rest_framework import generics
from .models import Subject, Standard, Topic, Chapter, Question, Option
from .serializers import SubjectSerializer, StandardSerializer,  TopicSerializer, ChapterSerializer, QuestionSerializer, OptionSerializer
from rest_framework.generics import RetrieveAPIView, UpdateAPIView


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

    def get_queryset(self):
        """
        Optionally restricts the returned options to a given question,
        by filtering against a `question` query parameter in the URL.
        """
        queryset = Option.objects.all()
        question_id = self.request.query_params.get('question', None)
        if question_id is not None:
            queryset = queryset.filter(question_id=question_id)
        return queryset


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



# class QuestionDetailView(UpdateAPIView):
#     queryset = Question.objects.all()
#     serializer_class = QuestionSerializer

# which ever class is below, works. other doesn't
class QuestionDetailView(RetrieveAPIView , UpdateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer