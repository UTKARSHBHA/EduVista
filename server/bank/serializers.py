from rest_framework import serializers
from .models import Subject, Standard, Topic, Chapter, Question, Option

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
    standard = serializers.CharField(source='standard.name', read_only=True)
    subject = serializers.CharField(source='subject.name', read_only=True)
    topic = serializers.CharField(source='topic.name', read_only=True)
    chapter = serializers.CharField(source='chapter.name', read_only=True)

    class Meta:
        model = Question
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['options'] = OptionSerializer(instance.options.all(), many=True).data
        return representation

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'