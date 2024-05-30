# from django.contrib.auth.models import Group, CustomUser
from rest_framework import serializers
from .models import CustomUser, Question, Chapter, Student, Subject, Standard, Tag, Teacher, Topic, Option
import base64
from django.core.files.base import ContentFile
import logging
import uuid
from datetime import datetime
from .models import QuestionPaper
from .models import EntranceTest

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

logger = logging.getLogger(__name__)

class SubjectSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Subject
        fields = '__all__'
        
class StandardSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Standard
        fields = '__all__'
        
class TopicSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Topic
        fields = ['id', 'name', 'chapter', 'user'] # Adjust the fields as needed

class ChapterSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Chapter
        fields = '__all__'
        
class OptionSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Option
        fields = ['id', 'text', 'is_correct']
class QuestionSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    tags = serializers.StringRelatedField(many=True)

    # print(request.user)
    standard_name = serializers.StringRelatedField(source='standard.name')
    subject_name = serializers.StringRelatedField(source='subject.name')
    chapter_name = serializers.StringRelatedField(source='chapter.name')
    topics_name = serializers.SerializerMethodField() 

    options = OptionSerializer( many=True)

    class Meta:
        model = Question
        fields = ['id', 'question_text', 'type', 'difficulty_level', 'standard', 'subject', 'marks', 'topics', 'chapter' , 'options','standard_name' , 'subject_name' , 'chapter_name', 'image', 'topics_name', 'user', 'tags']

    def get_topics_name(self, obj):
        # Assuming 'topics' is a ManyToMany field on the Question model
        return [topic.name for topic in obj.topics.all()]


    def to_internal_value(self, data):
        # Handle the image field manually
        image_data = data.get('image')
        if image_data and ';base64,' in image_data:
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]
            image_name = f"{uuid.uuid4()}_{datetime.now().strftime('%Y%m%d%H%M%S')}.{ext}"
            data['image'] = ContentFile(base64.b64decode(imgstr), name=image_name)
        return super().to_internal_value(data)


    def create(self, validated_data):

        options_data = validated_data.pop('options')
    
        topics_data = validated_data.pop('topics', [])
        # user = validated_data.pop('user')
        # print(user)
        question = Question.objects.create(**validated_data)
        for option_data in options_data:
            # user = validated_data.user.id
            option_data['user'] = self.context['request'].user

            Option.objects.create(question=question, **option_data)
       
        if topics_data:
            question.topics.add(*topics_data)


        return question

    def update(self, instance, validated_data):
        options_data = validated_data.pop('options')
        topics = validated_data.pop('topics', [])

        # Update question fields
        # if(topics):
        instance.topics.set(topics)


        instance.question_text = validated_data.get('question_text', instance.question_text)
        instance.type = validated_data.get('type', instance.type)
        instance.difficulty_level = validated_data.get('difficulty_level', instance.difficulty_level)
        instance.standard = validated_data.get('standard', instance.standard)
        instance.subject = validated_data.get('subject', instance.subject)
        instance.marks = validated_data.get('marks', instance.marks)
        # instance.topics = validated_data.get('topics', instance.topics)
        instance.chapter = validated_data.get('chapter', instance.chapter)
        instance.image = validated_data.get('image', instance.image)
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
        model = CustomUser
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
    


class QuestionPaperSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    # tags = TagSerializer(many=True, read_only=False)

    standard_name = serializers.SerializerMethodField()
    subject_name = serializers.SerializerMethodField()
    chapter_name = serializers.SerializerMethodField()
    topics_name = serializers.SerializerMethodField()
    tags_name = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = QuestionPaper
        fields = ['id', 'standard', 'subject', 'chapter', 'topics', 'tags','question_paper_json' , 'total_marks', 'question_count', 'standard_name', 'chapter_name' , 'topics_name' ,'subject_name', 'created_at', 'updated_at', 'user', 'tags_name']

    def get_standard_name(self, obj):
        return obj.standard.name if obj.standard else None

    def get_subject_name(self, obj):
        return obj.subject.name if obj.subject else None

    def get_chapter_name(self, obj):
        return obj.chapter.name if obj.chapter else None

    def get_topics_name(self, obj):
        return ', '.join([topic.name for topic in obj.topics.all()]) if obj.topics.exists() else None
    
    def get_tags_name(self, obj):
        return ', '.join([tag.name for tag in obj.tags.all()]) if obj.tags.exists() else None



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add additional claims
        token['role'] = user.role # Assuming the user model has a 'role' field
        token['username'] = user.username
        token['permissions'] = list(user.get_all_permissions())
        # print(list(user.get_all_permissions()))
        return token


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class StudentSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()  # Nested serializer for user creation

    class Meta:
        model = Student
        fields = (
            'id',
            'user',
            'first_name',
            'last_name',
            'middle_name',
            'phone_number',
            'alternate_phone_number',
            'date_of_birth',
            'gender',
            'registration_number',
            'admission_date',
            'address_line1',
            'address_line2',
            'city',
            'state',
            'postal_code',
            'country',
            'profile_picture',
            'parent_guardian_name',
            'parent_guardian_contact',
            'parent_guardian_email',
            'emergency_contact_name',
            'emergency_contact_number',
        )
    def to_internal_value(self, data):
        # Handle the image field manually
        image_data = data.get('profile_picture')
        if image_data and ';base64,' in image_data:
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]
            image_name = f"{uuid.uuid4()}_{datetime.now().strftime('%Y%m%d%H%M%S')}.{ext}"
            data['profile_picture'] = ContentFile(base64.b64decode(imgstr), name=image_name)
        return super().to_internal_value(data)
    

    def create(self, validated_data):
        user_serializer = self.fields['user']  # Access nested serializer
        user_data = validated_data.pop('user')
        validated_user_data = user_serializer.validate(user_data)  # Validate user data

        # Create the user object
        user = CustomUser.objects.create_user(**validated_user_data)

        # Create the student object with the created user
        student = Student.objects.create(user=user, **validated_data)
        return student
    
    # def update(self, request, *args, **kwargs):
    #     return super().update(request, *args, **kwargs)

    def update(self, instance, validated_data):
        # Remove the 'user' field from the validated data
        validated_data.pop('user', None)

        # Call the superclass's update method
        return super().update(instance, validated_data)
    

class TeacherSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()  # Nested serializer for user creation
    
    class Meta:
        model = Teacher
        fields = (
            'id',
            'user',
            'first_name',
            'last_name',
            'middle_name',
            'phone_number',
            'alternate_phone_number',
            'date_of_birth',
            'gender',
            'designation',
            'department',
            'joining_date',
            'address_line1',
            'address_line2',
            'city',
            'state',
            'postal_code',
            'country',
            'profile_picture',
            'biography',
        )

    def to_internal_value(self, data):
        # Handle the image field manually
        image_data = data.get('profile_picture')
        if image_data and ';base64,' in image_data:
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]
            image_name = f"{uuid.uuid4()}_{datetime.now().strftime('%Y%m%d%H%M%S')}.{ext}"
            data['profile_picture'] = ContentFile(base64.b64decode(imgstr), name=image_name)
        return super().to_internal_value(data)
    

    def create(self, validated_data):
        user_serializer = self.fields['user']  # Access nested serializer
        user_data = validated_data.pop('user')
        validated_user_data = user_serializer.validate(user_data)  # Validate user data
        
        # Create the user object
        user = CustomUser.objects.create_user(**validated_user_data)
        
        # Create the teacher object with the created user
        teacher = Teacher.objects.create(user=user, **validated_data)
        return teacher
    

class TagSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Tag
        fields = ['id', 'name', 'creator']



class EntranceTestSerializer(serializers.ModelSerializer):
    subject_name = serializers.StringRelatedField(source='subject.name')
    standard_name = serializers.StringRelatedField(source='standard.name')

    class Meta:
        model = EntranceTest
        fields = ['id', 'subject', 'standard', 'date', 'start_time', 'end_time', 'exam_type', 'registration_fee', 'description', 'location', 'subject_name', 'standard_name']
