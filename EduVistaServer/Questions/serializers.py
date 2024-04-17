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
        fields = ['id', 'text', 'is_correct']
class QuestionSerializer(serializers.ModelSerializer):
    standard_name = serializers.StringRelatedField(source='standard.name')
    subject_name = serializers.StringRelatedField(source='subject.name')
    topic_name = serializers.StringRelatedField(source='topic.name')
    chapter_name = serializers.StringRelatedField(source='chapter.name')

    options = OptionSerializer( many=True)
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'type', 'difficulty_level', 'standard', 'subject', 'marks', 'topic', 'chapter' , 'options','standard_name' , 'subject_name' , 'topic_name' , 'chapter_name']

    # def to_representation(self, instance):
    #     # Call the base implementation first to get a dictionary
    #     ret = super().to_representation(instance)
    #     # Remove the 'options' field from the representation
    #     ret.pop('options', None)
    #     return ret


    def create(self, validated_data):
        options_data = validated_data.pop('options')
        question = Question.objects.create(**validated_data)
        for option_data in options_data:
            Option.objects.create(question=question, **option_data)
        return question

    def update(self, instance, validated_data):
        options_data = validated_data.pop('options')
        # Update question fields
        instance.question_text = validated_data.get('question_text', instance.question_text)
        instance.type = validated_data.get('type', instance.type)
        instance.difficulty_level = validated_data.get('difficulty_level', instance.difficulty_level)
        instance.standard = validated_data.get('standard', instance.standard)
        instance.subject = validated_data.get('subject', instance.subject)
        instance.marks = validated_data.get('marks', instance.marks)
        instance.topic = validated_data.get('topic', instance.topic)
        instance.chapter = validated_data.get('chapter', instance.chapter)
        instance.save()

        # Get the current set of options
        options = {option.id: option for option in instance.options.all()}
        option_ids = []

        for option_data in options_data:
            option_id = option_data.get('id', None)
            if option_id:
                # Update existing option
                if option_id in options:
                    option = options.get(option_id)
                    option.text = option_data.get('text', option.text)
                    option.is_correct = option_data.get('is_correct', option.is_correct)
                    option.save()
                    option_ids.append(option_id)
                else:
                    # If the option is not found in the current options, it might have been deleted
                    Option.objects.filter(id=option_id).delete()
            else:
                # Create new option
                Option.objects.create(question=instance, **option_data)

        # Delete options that are not in the updated list
        for option in options.values():
            if option.id not in option_ids:
                option.delete()

        return instance
        




class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user