from rest_framework import viewsets, status

# Import your serializers
from .serializers import QuestionSerializer, ChapterSerializer, SubjectSerializer, StandardSerializer, TopicSerializer, OptionSerializer

# Import your models
from .models import Question, Chapter, Subject, Standard, Topic, Option

from rest_framework.parsers import MultiPartParser, FormParser

import logging

from rest_framework.views import APIView
from .serializers import SignupSerializer
from rest_framework.response import Response

from rest_framework.permissions import AllowAny

from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views import View

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from braces.views import CsrfExemptMixin

# Create a logger instance
logger = logging.getLogger(__name__)



class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    # parser_classes = [MultiPartParser, FormParser]

    

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




class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(CsrfExemptMixin, View):
    authentication_classes = []
    # permission_classes = [AllowAny]

    
    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Redirect to a success page.
            request.session['username'] =username
            request.session.save()
            return JsonResponse({'status': 'success', 'message': 'Logged in successfully.'})
        else:
            # Return an error response.
            return JsonResponse({'status': 'error', 'message': 'Invalid login credentials.'}, status=400)



@csrf_exempt
def get_csrf_token(request):
    """
    View to return the CSRF token.
    """
    return JsonResponse({'csrfToken': request.META['csrftoken']})