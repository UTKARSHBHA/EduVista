from django.urls import path, include
from rest_framework import routers

from .views import QuestionListCreate

router = routers.DefaultRouter()

urlpatterns = [
    path('', QuestionListCreate.as_view(), name='question-list-create'),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # # ex: /polls/5/
    # path("<int:question_id>/", views.detail, name="detail"),
    # # ex: /polls/5/results/
    # path("<int:question_id>/results/", views.results, name="results"),
    # # ex: /polls/5/vote/
    # path("<int:question_id>/vote/", views.vote, name="vote"),
]