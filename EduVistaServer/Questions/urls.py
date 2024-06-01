from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CandidateViewSet, EntranceTestViewSet, QuestionViewSet, ChapterViewSet, StandardViewSet, StudentViewSet, TagViewSet, TeacherViewSet, TopicViewSet, SubjectViewSet, OptionViewSet, QuestionPaperViewSet

from django.conf import settings
from django.conf.urls.static import static

from .views import SignupView
from django.contrib.auth import views as auth_views

from . import views
from .views import change_password
from .views import generate_question_paper
from.views import GetNewQuestionView


router = DefaultRouter()
router.register(r'entrance-tests', EntranceTestViewSet)
router.register(r'candidates', CandidateViewSet)

router.register(r'questions', QuestionViewSet)
router.register(r'standards', StandardViewSet)
router.register(r'options', OptionViewSet)
router.register(r'students', StudentViewSet)
router.register(r'subjects', SubjectViewSet, basename='subjects')
router.register(r'topics', TopicViewSet, basename='topics')
router.register(r'chapters', ChapterViewSet, basename='chapters')
router.register(r'question-papers', QuestionPaperViewSet, basename='question_papers')
router.register(r'teachers', TeacherViewSet)
router.register(r'tags', TagViewSet, basename='tag')


urlpatterns = [
    
    path('', include(router.urls)), 
    
    path('signup/', SignupView.as_view(), name='signup'),

    path('password_reset/', views.password_reset, name='password_reset'),
    
    path('password_reset_confirm/<str:token>/', views.password_reset_confirm, name='password_reset_confirm'),

    path('change_password/', change_password, name='change_password'),

    path('generate-question-paper/', generate_question_paper, name='generate_question_paper'),

    path('get-new-question/', GetNewQuestionView.as_view(), name='get-new-question'),

]