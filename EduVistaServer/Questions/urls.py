from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuestionViewSet, ChapterViewSet, StandardViewSet, TopicViewSet, SubjectViewSet, OptionViewSet, QuestionPaperViewSet

from django.conf import settings
from django.conf.urls.static import static

from .views import SignupView
from django.contrib.auth import views as auth_views

from . import views
from .views import change_password
from .views import generate_question_paper


router = DefaultRouter()
router.register(r'questions', QuestionViewSet)
router.register(r'standards', StandardViewSet)
router.register(r'options', OptionViewSet)
router.register(r'subjects', SubjectViewSet, basename='subjects')
router.register(r'topics', TopicViewSet, basename='topics')
router.register(r'chapters', ChapterViewSet, basename='chapters')
router.register(r'question-papers', QuestionPaperViewSet, basename='question_papers')

urlpatterns = [
    
    path('', include(router.urls)),
    
    path('signup/', SignupView.as_view(), name='signup'),

    path('password_reset/', views.password_reset, name='password_reset'),
    
    path('password_reset_confirm/<str:token>/', views.password_reset_confirm, name='password_reset_confirm'),

    path('change_password/', change_password, name='change_password'),

    path('generate-question-paper/', generate_question_paper, name='generate_question_paper'),

]