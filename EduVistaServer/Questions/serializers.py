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
        
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['text', 'is_correct']
class QuestionSerializer(serializers.ModelSerializer):
    standard_name = serializers.StringRelatedField(source='standard.name')
    subject_name = serializers.StringRelatedField(source='subject.name')
    topic_name = serializers.StringRelatedField(source='topic.name')
    chapter_name = serializers.StringRelatedField(source='chapter.name')

    options = OptionSerializer(many=True)
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'type', 'difficulty_level', 'standard', 'subject', 'marks', 'topic', 'chapter', 'options' , 'standard_name' , 'subject_name' , 'topic_name' , 'chapter_name']

    def create(self, validated_data):
        options_data = validated_data.pop('options')
        question = Question.objects.create(**validated_data)
        for option_data in options_data:
            Option.objects.create(question=question, **option_data)
        return question

    