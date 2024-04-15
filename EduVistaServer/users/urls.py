from django.urls import path

from . import views

urlpatterns = [
    path("myuser/", views.index, name="index"),
]