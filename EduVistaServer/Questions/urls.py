from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuestionViewSet, ChapterViewSet, StandardViewSet, TopicViewSet, SubjectViewSet, OptionViewSet

router = DefaultRouter()
router.register(r'questions', QuestionViewSet)
router.register(r'chapters', ChapterViewSet)
router.register(r'standards', StandardViewSet)
router.register(r'topics', TopicViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'options', OptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]