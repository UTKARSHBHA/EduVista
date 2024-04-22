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
    

User = get_user_model()


@csrf_exempt
def password_reset(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        print(f"Searching for user with email: {email}") # Debugging line
        if not email:
            return JsonResponse({'error': 'Email is required.'}, status=400)
        try:
            user = User.objects.get(email=email)
            print(f"Found user: {user}") # Debugging line
        except User.DoesNotExist:
            print(f"User with email {email} does not exist.") # Debugging line
            return JsonResponse({'error': 'User with this email does not exist.'}, status=400)

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
            [user.email],
            fail_silently=False,
        )

        return JsonResponse({'message': 'Password reset email sent.'})

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