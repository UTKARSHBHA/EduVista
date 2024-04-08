from django.urls import path
from .views import SubjectListCreateView, StandardListCreateView,  TopicListCreateView, ChapterListCreateView, QuestionListCreateView, OptionListCreateView, SubjectDeleteView, StandardDeleteView, TopicDeleteView, ChapterDeleteView

urlpatterns = [
    path('subjects/', SubjectListCreateView.as_view(), name='subject-list-create'),
    path('standards/', StandardListCreateView.as_view(), name='class-list-create'),
    path('topics/', TopicListCreateView.as_view(), name='topic-list-create'),
    path('chapters/', ChapterListCreateView.as_view(), name='chapter-list-create'),
    path('questions/', QuestionListCreateView.as_view(), name='question-list-create'),
    path('options/', OptionListCreateView.as_view(), name='option-list-create'),

    # delete
        path('subjects/<int:pk>/delete/', SubjectDeleteView.as_view(), name='delete_subject'),
        
        path('standards/<int:pk>/delete/', StandardDeleteView.as_view(), name='delete_standard'),
        
        path('topics/<int:pk>/delete/', TopicDeleteView.as_view(), name='delete_topic'),

        path('chapters/<int:pk>/delete/', ChapterDeleteView.as_view(), name='delete_chapter'),


]
