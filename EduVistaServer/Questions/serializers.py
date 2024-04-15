from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Question, Chapter, Subject, Standard, Topic, Option


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'
        
class StandardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Standard
        fields = '__all__'
        
class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'
        
class QuestionSerializer(serializers.ModelSerializer):
    standard_name = serializers.StringRelatedField(source='standard.name', read_only=True)
    subject_name = serializers.StringRelatedField(source='subject.name', read_only=True)
    topic_name = serializers.StringRelatedField(source='topic.name', read_only=True)
    chapter_name = serializers.StringRelatedField(source='chapter.name', read_only=True)
    class Meta:
        model = Question
        fields = '__all__'
        
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'