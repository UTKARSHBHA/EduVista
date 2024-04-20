from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuestionViewSet, ChapterViewSet, StandardViewSet, TopicViewSet, SubjectViewSet, OptionViewSet

from django.conf import settings
from django.conf.urls.static import static

from .views import SignupView
from django.contrib.auth import views as auth_views

from . import views

router = DefaultRouter()
router.register(r'questions', QuestionViewSet)
router.register(r'chapters', ChapterViewSet)
router.register(r'standards', StandardViewSet)
router.register(r'topics', TopicViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'options', OptionViewSet)

urlpatterns = [
    
    path('', include(router.urls)),
    
    path('signup/', SignupView.as_view(), name='signup'),

    path('password_reset/', views.password_reset, name='password_reset'),
    
    path('password_reset_confirm/<str:token>/', views.password_reset_confirm, name='password_reset_confirm'),

]