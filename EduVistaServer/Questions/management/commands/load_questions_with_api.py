import time
from django.core.management.base import BaseCommand
import requests
from Questions.models import Question, Standard, Subject, Topic, Chapter, Option
import random
import html # Import the html module

class Command(BaseCommand):
    help = 'Loads questions from the Open Trivia Database into the database'

    def handle(self, *args, **options):
        # Define the API endpoint
        url = "https://opentdb.com/api.php?amount=100"

        # Send a GET request to the API
        for i in range(1000000000000):

            time.sleep(5)
            print(i)
            response = requests.get(url)

            # Check if the request was successful
            if response.status_code == 200:
                # Parse the JSON response
                data = response.json()

                # Prepare a list to hold the Question instances
                questions = []

                # Iterate over the results and create Question instances
                for item in data['results']:
                    # Extract question data and unescape HTML entities
                    question_text = html.unescape(item['question'])
                    difficulty_level = item['difficulty']
                    type = item['type']
                    category = html.unescape(item['category']) # Unescape category as well

                    # Map API types to our model's types
                    if type == "multiple":
                        # Randomly set type to either "mcq" or "descriptive"
                        type = random.choice(['mcq', 'descriptive'])
                    elif type == "boolean":
                        type = "tf"
                    else:
                        # For descriptive questions, randomly assign a type and skip options
                        type = random.choice(['mcq', 'tf'])
                        continue # Skip this iteration for descriptive questions

                    # Randomly assign standard
                    standard_name = f"Standard {random.randint(1, 5)}"
                    standard, created = Standard.objects.get_or_create(name=standard_name)

                    # Randomly assign marks
                    marks = random.choice([1, 2, 5])

                    # Handle category for subject and topics
                    subject_name, topics_str = category.split(':') if ':' in category else (category, '')
                    topics = [html.unescape(topic.strip()) for topic in topics_str.split('&amp;')] if topics_str else []

                    # Create or get the Subject instance
                    subject, created = Subject.objects.get_or_create(name=subject_name)

                    standard.subjects.add(subject)
                    # For simplicity, we'll just use the category as the chapter
                    # You might want to map these categories to your own chapters
                    chapter_name = category
                    chapter, created = Chapter.objects.get_or_create(name=chapter_name, subject=subject)

                    # Check if the question already exists in the database
                    question, created = Question.objects.get_or_create(
                        question_text=question_text,
                        defaults={
                            'difficulty_level': difficulty_level,
                            'type': type,
                            'subject': subject,
                            'standard': standard,
                            'marks': marks,
                            'chapter': chapter,
                        }
                    )

                    # If the question was not created (meaning it already existed), skip to the next iteration
                    if not created:
                        print('not creaated')
                        continue
                    print('created')
                    # Add topics to the question
                    # for topic_name in topics:
                    #     topic, created = Topic.objects.get_or_create(name=topic_name, chapter=chapter)
                    #     question.topics.add(topic)

                    topics = [Topic.objects.get_or_create(name=name, chapter = chapter)[0] for name in topics]

                    question.topics.set(topics)

                    # Create options for MCQ and TF questions
                    if type in ['mcq', 'tf']:
                        correct_answer = html.unescape(item['correct_answer'])
                        incorrect_answers = [html.unescape(answer) for answer in item['incorrect_answers']]
                        options_data = [{'text': correct_answer, 'is_correct': True}] + [{'text': answer, 'is_correct': False} for answer in incorrect_answers]
                        options = [Option(text=option['text'], is_correct=option['is_correct'], question=question) for option in options_data]
                        Option.objects.bulk_create(options)

                    # Add the question to the list
                    # questions.append(question)

                self.stdout.write(self.style.SUCCESS('Successfully loaded questions from the Open Trivia Database'))
            else:
                self.stdout.write(self.style.ERROR('Failed to fetch questions'))