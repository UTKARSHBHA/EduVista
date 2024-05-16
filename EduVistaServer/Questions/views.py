from rest_framework import viewsets, status

# Import your serializers
from .serializers import CustomTokenObtainPairSerializer, QuestionPaperSerializer, QuestionSerializer, ChapterSerializer, StudentSerializer, SubjectSerializer, StandardSerializer, TopicSerializer, OptionSerializer

# Import your models
from .models import Question, Chapter, QuestionPaper, Student, Subject, Standard, Topic, Option

from rest_framework.parsers import MultiPartParser, FormParser

import logging

from rest_framework.views import APIView
from .serializers import SignupSerializer
from rest_framework.response import Response

from rest_framework.permissions import AllowAny


from django.core.mail import send_mail
from django.http import JsonResponse
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import PasswordResetToken

from django.views.decorators.csrf import csrf_exempt
import json


from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from .models import PasswordResetToken


from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from random import shuffle

from rest_framework.pagination import PageNumberPagination

from django.db.models import Q
from rest_framework.permissions import DjangoModelPermissions
from rest_framework_simplejwt.views import TokenObtainPairView
from random import choice


# Create a logger instance
logger = logging.getLogger(__name__)


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    pagination_class = CustomPageNumberPagination
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Set the user field
        return serializer.save()  # Optionally return the saved object

    # parser_classes = [MultiPartParser, FormParser]

    
class ChapterViewSet(viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer    
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Set the user field
        return serializer.save()  # Optionally return the saved object


class StandardViewSet(viewsets.ModelViewSet):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Set the user field
        return serializer.save()  # Optionally return the saved object

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Set the user field
        return serializer.save()  # Optionally return the saved object    

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Set the user field
        return serializer.save()  # Optionally return the saved object


  


class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Set the user field
        return serializer.save()  # Optionally return the saved object


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

User = get_user_model()


@csrf_exempt
def password_reset(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username') # Change this line
        print(f"Searching for user with username: {username}") # Debugging line
        if not username:
            return JsonResponse({'error': 'Username is required.'}, status=400)
        try:
            user = User.objects.get(username=username) # Change this line
        except User.DoesNotExist:
            return JsonResponse({'error': 'User with this username does not exist.'}, status=400)


        # Create a new password reset token
        token = PasswordResetToken.objects.create(user=user)

        # Construct the password reset URL
        reset_url = request.build_absolute_uri(reverse('password_reset_confirm', kwargs={'token': token.token}))
        reset_url = reset_url.replace(':8000', ':4200') # Replace the Django server port with the Angular app port


        # Send the email
        send_mail(
            'Password Reset',
            f'Please click the following link to reset your password: {reset_url}',
            'from@example.com',
            [user.username],
            fail_silently=False,
        )

        return JsonResponse({'message': 'Password reset username sent.'})

    return JsonResponse({'error': 'Invalid request.'}, status=400)



@csrf_exempt
def password_reset_confirm(request, token):
    try:
        reset_token = PasswordResetToken.objects.get(token=token)
    except PasswordResetToken.DoesNotExist:
        return JsonResponse({'error': 'Invalid or expired password reset token.'}, status=400)

    if request.method == 'POST':
        data = json.loads(request.body)
        new_password = data.get('new_password')
        # new_password = request.POST.get('new_password')
        if not new_password:
            return JsonResponse({'error': 'New password is required.'}, status=400)

        # Update the user's password
        reset_token.user.password = make_password(new_password)
        reset_token.user.save()

        # Optionally, delete the used token
        reset_token.delete()

        return JsonResponse({'message': 'Password has been reset.'})

    # For GET requests, you might want to return a form or instructions
    return JsonResponse({'message': 'Please submit your new password.'})



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')
    if not old_password or not new_password:
        return Response({'error': 'Old password and new password are required.'}, status=400)
    if not check_password(old_password, user.password):
        return Response({'error': 'Old password is incorrect.'}, status=400)
    user.password = make_password(new_password)
    user.save()
    return Response({'message': 'Password has been changed.'})


@api_view(['POST'])
def generate_question_paper(request):
    if request.method == 'POST':
        # Extract JSON data from the request with default values
        data = request.data
        standard = data.get('standard', None)
        subject = data.get('subject', None)
        topics = data.get('topics', [])
        chapters = data.get('chapters', [])
        questions_grid = data.get('questionsGrid', [])
        
        # print(data)
        
        # print(topics)

        # Fetch all relevant questions and shuffle them
        
        query = Q(standard=standard, subject=subject)
        if topics: # Only add topic filter if topics list is not empty
            query &= Q(topics__in=topics)
        if chapters: 
            query &= Q(chapter__in=chapters)



        questions = list(Question.objects.filter(query))
        # print(questions)


        # print(topics)

        shuffle(questions)

        selected_questions = []
        for question_type in questions_grid:
            type = question_type.get('type')
            marks = question_type.get('marks')
            count = question_type.get('count')
            # Filter questions based on type and marks using a list comprehension
            filtered_questions = [question for question in questions if question.type == type and question.marks == marks]
            # Extend selected_questions with the first 'count' questions from the filtered list
            selected_questions.extend(filtered_questions[:count])

        # Generate the question paper
        question_paper = {
            'questions': QuestionSerializer(selected_questions, many=True).data

        }

        if len(selected_questions) < sum(question_type.get('count', 0) for question_type in questions_grid): 
            return Response({'error': 'Insufficient questions available to generate the question paper.'}, status=400)


        return Response(question_paper)
    else:
        return Response({'error': 'Invalid request method.'}, status=400)
        


class QuestionPaperViewSet(viewsets.ModelViewSet):
    queryset = QuestionPaper.objects.all()
    serializer_class = QuestionPaperSerializer
    permission_classes = [DjangoModelPermissions]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Set the user field
        return serializer.save()  # Optionally return the saved object


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class GetNewQuestionView(APIView):
    def post(self, request, *args, **kwargs):
        question_to_replace = request.data.get('questionToReplace')
        existing_questions_ids = request.data.get('existingQuestionsIds').split(',')
        
        # Logic to find a new question that matches the criteria and is not in the list of existing questions
        # This is a placeholder for your actual logic
        new_questions = list( Question.objects.filter(
            standard=question_to_replace['standard'],
            subject=question_to_replace['subject'],
            chapter=question_to_replace['chapter'],
            topics__in=question_to_replace['topics'],
            difficulty_level=question_to_replace['difficulty_level'],
            marks=question_to_replace['marks'],
            type=question_to_replace['type']
        ).exclude(id__in=existing_questions_ids))

        new_question = choice(new_questions)
        
        if new_question:
            return Response(QuestionSerializer(new_question).data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No suitable question found.'}, status=status.HTTP_404_NOT_FOUND)
        

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    def get_serializer(self, *args, **kwargs):
        # Set partial=True if it's an update request
        if self.action == 'update':
            kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs)