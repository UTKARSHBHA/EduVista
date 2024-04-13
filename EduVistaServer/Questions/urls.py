from django.urls import path, include
from rest_framework import routers

from .views import QuestionListCreate, QuestionDeleteAPI, QuestionUpdateAPI, QuestionListCreateById, ChapterListCreate, ChapterDeleteAPI, ChapterUpdateAPI, ChapterListCreateById, StandardListCreate, StandardDeleteAPI, StandardUpdateAPI, StandardListCreateById,  TopicListCreate, TopicDeleteAPI, TopicUpdateAPI, TopicListCreateById,  SubjectListCreate, SubjectDeleteAPI, SubjectUpdateAPI, SubjectListCreateById,  OptionListCreate, OptionDeleteAPI, OptionUpdateAPI, OptionListCreateById

router = routers.DefaultRouter()

urlpatterns = [
    path('', QuestionListCreate.as_view(), name='question-list-create'),
    path('<int:id>/', QuestionListCreateById.as_view(), name='question-list-by-id'),
    path('delete/<int:id>/', QuestionDeleteAPI.as_view(), name='question-delete'),
    path('update/<int:id>/', QuestionUpdateAPI.as_view(), name='question-update'),
    
    # CHAPTERS
    path('chapters/', ChapterListCreate.as_view(), name='Chapter-list-create'),
    path('chapters/<int:id>/', ChapterListCreateById.as_view(), name='Chapter-list-by-id'),
    path('chapters/delete/<int:id>/', ChapterDeleteAPI.as_view(), name='Chapter-delete'),
    path('chapters/update/<int:id>/', ChapterUpdateAPI.as_view(), name='Chapter-update'),
    
    # TOPICS
    path('topic/', TopicListCreate.as_view(), name='Topic-list-create'),
    path('topic/<int:id>/', TopicListCreateById.as_view(), name='Topic-list-by-id'),
    path('topic/delete/<int:id>/', TopicDeleteAPI.as_view(), name='Topic-delete'),
    path('topic/update/<int:id>/', TopicUpdateAPI.as_view(), name='Topic-update'),

    # Standard
    path('standard/', StandardListCreate.as_view(), name='Standard-list-create'),
    path('standard/<int:id>/', StandardListCreateById.as_view(), name='Standard-list-by-id'),
    path('standard/delete/<int:id>/', StandardDeleteAPI.as_view(), name='Standard-delete'),
    path('standard/update/<int:id>/', StandardUpdateAPI.as_view(), name='Standard-update'),
    # SUBJECT
    path('subject/', SubjectListCreate.as_view(), name='Subject-list-create'),
    path('subject/<int:id>/', SubjectListCreateById.as_view(), name='Subject-list-by-id'),
    path('subject/delete/<int:id>/', SubjectDeleteAPI.as_view(), name='Subject-delete'),
    path('subject/update/<int:id>/', SubjectUpdateAPI.as_view(), name='Subject-update'),
    # OPTION
    path('option/', OptionListCreate.as_view(), name='Option-list-create'),
    path('option/<int:id>/', OptionListCreateById.as_view(), name='Option-list-by-id'),
    path('option/delete/<int:id>/', OptionDeleteAPI.as_view(), name='Option-delete'),
    path('option/update/<int:id>/', OptionUpdateAPI.as_view(), name='Option-update'),

    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # # ex: /polls/5/
    # path("<int:question_id>/", views.detail, name="detail"),
    # # ex: /polls/5/results/
    # path("<int:question_id>/results/", views.results, name="results"),
    # # ex: /polls/5/vote/
    # path("<int:question_id>/vote/", views.vote, name="vote"),
]