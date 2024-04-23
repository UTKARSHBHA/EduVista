from django.core.management.base import BaseCommand
from django.db import transaction
from Questions.models import Question, Standard, Subject, Topic, Chapter, Option


class Command(BaseCommand):
    help = 'Loads dummy questions into the database'

    def handle(self, *args, **options):
        dummy_questions = [
            {
                'type': 'mcq',
                'difficulty_level': 'hard',
                'marks': 5,
                'question_text': 'What is the capital of France?',
                'standard': 'Standard 1',
                'subject': 'Geography',
                'topic': 'Capitals',
                'chapter': 'Europe',
                'options': [
                    {'text': 'Paris', 'is_correct': True},
                    {'text': 'London', 'is_correct': False},
                    {'text': 'Berlin', 'is_correct': False},
                    {'text': 'Madrid', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'medium',
                'marks': 3,
                'question_text': 'Which planet is known as the Red Planet?',
                'standard': 'Standard 2',
                'subject': 'Science',
                'topic': 'Astronomy',
                'chapter': 'Planets',
                'options': [
                    {'text': 'Mars', 'is_correct': True},
                    {'text': 'Jupiter', 'is_correct': False},
                    {'text': 'Venus', 'is_correct': False},
                    {'text': 'Saturn', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'easy',
                'marks': 2,
                'question_text': 'What is the chemical symbol for water?',
                'standard': 'Standard 3',
                'subject': 'Chemistry',
                'topic': 'Chemical Elements',
                'chapter': 'Periodic Table',
                'options': [
                    {'text': 'H2O', 'is_correct': True},
                    {'text': 'CO2', 'is_correct': False},
                    {'text': 'NaCl', 'is_correct': False},
                    {'text': 'O2', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'hard',
                'marks': 5,
                'question_text': 'Who wrote the novel "To Kill a Mockingbird"?',
                'standard': 'Standard 4',
                'subject': 'Literature',
                'topic': 'Authors',
                'chapter': 'American Literature',
                'options': [
                    {'text': 'Harper Lee', 'is_correct': True},
                    {'text': 'J.D. Salinger', 'is_correct': False},
                    {'text': 'Ernest Hemingway', 'is_correct': False},
                    {'text': 'Mark Twain', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'easy',
                'marks': 2,
                'question_text': 'Which gas is most abundant in Earth\'s atmosphere?',
                'standard': 'Standard 5',
                'subject': 'Science',
                'topic': 'Atmosphere',
                'chapter': 'Composition of the Atmosphere',
                'options': [
                    {'text': 'Nitrogen', 'is_correct': True},
                    {'text': 'Oxygen', 'is_correct': False},
                    {'text': 'Carbon dioxide', 'is_correct': False},
                    {'text': 'Argon', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'medium',
                'marks': 3,
                'question_text': 'Which famous scientist developed the theory of relativity?',
                'standard': 'Standard 6',
                'subject': 'Physics',
                'topic': 'Relativity',
                'chapter': 'Einstein\'s Theory of Relativity',
                'options': [
                    {'text': 'Albert Einstein', 'is_correct': True},
                    {'text': 'Isaac Newton', 'is_correct': False},
                    {'text': 'Stephen Hawking', 'is_correct': False},
                    {'text': 'Galileo Galilei', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'hard',
                'marks': 5,
                'question_text': 'Which of the following is not a primary color?',
                'standard': 'Standard 7',
                'subject': 'Art',
                'topic': 'Color Theory',
                'chapter': 'Primary Colors',
                'options': [
                    {'text': 'Green', 'is_correct': True},
                    {'text': 'Red', 'is_correct': False},
                    {'text': 'Blue', 'is_correct': False},
                    {'text': 'Yellow', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'medium',
                'marks': 3,
                'question_text': 'Who painted the Mona Lisa?',
                'standard': 'Standard 8',
                'subject': 'Art',
                'topic': 'Famous Artworks',
                'chapter': 'Renaissance Art',
                'options': [
                    {'text': 'Leonardo da Vinci', 'is_correct': True},
                    {'text': 'Vincent van Gogh', 'is_correct': False},
                    {'text': 'Pablo Picasso', 'is_correct': False},
                    {'text': 'Michelangelo', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'hard',
                'marks': 5,
                'question_text': 'What is the tallest mountain in the world?',
                'standard': 'Standard 9',
                'subject': 'Geography',
                'topic': 'Mountains',
                'chapter': 'Famous Mountains',
                'options': [
                    {'text': 'Mount Everest', 'is_correct': True},
                    {'text': 'K2', 'is_correct': False},
                    {'text': 'Kangchenjunga', 'is_correct': False},
                    {'text': 'Lhotse', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'easy',
                'marks': 2,
                'question_text': 'Which continent is the largest by land area?',
                'standard': 'Standard 10',
                'subject': 'Geography',
                'topic': 'Continents',
                'chapter': 'Continent Sizes',
                'options': [
                    {'text': 'Asia', 'is_correct': True},
                    {'text': 'Africa', 'is_correct': False},
                    {'text': 'North America', 'is_correct': False},
                    {'text': 'Europe', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'medium',
                'marks': 3,
                'question_text': 'What is the powerhouse of the cell?',
                'standard': 'Standard 11',
                'subject': 'Biology',
                'topic': 'Cell Biology',
                'chapter': 'Cell Structure',
                'options': [
                    {'text': 'Mitochondrion', 'is_correct': True},
                    {'text': 'Nucleus', 'is_correct': False},
                    {'text': 'Golgi Apparatus', 'is_correct': False},
                    {'text': 'Endoplasmic Reticulum', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'hard',
                'marks': 5,
                'question_text': 'Which famous scientist is known for his theory of evolution by natural selection?',
                'standard': 'Standard 12',
                'subject': 'Biology',
                'topic': 'Evolution',
                'chapter': 'Theory of Evolution',
                'options': [
                    {'text': 'Charles Darwin', 'is_correct': True},
                    {'text': 'Gregor Mendel', 'is_correct': False},
                    {'text': 'Louis Pasteur', 'is_correct': False},
                    {'text': 'Albert Einstein', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'medium',
                'marks': 3,
                'question_text': 'Which country is known as the Land of the Rising Sun?',
                'standard': 'Standard 1',
                'subject': 'Geography',
                'topic': 'Countries and Cultures',
                'chapter': 'Asia',
                'options': [
                    {'text': 'Japan', 'is_correct': True},
                    {'text': 'China', 'is_correct': False},
                    {'text': 'India', 'is_correct': False},
                    {'text': 'South Korea', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'hard',
                'marks': 5,
                'question_text': 'Who is credited with discovering penicillin?',
                'standard': 'Standard 2',
                'subject': 'Biology',
                'topic': 'Microbiology',
                'chapter': 'Antibiotics',
                'options': [
                    {'text': 'Alexander Fleming', 'is_correct': True},
                    {'text': 'Louis Pasteur', 'is_correct': False},
                    {'text': 'Robert Koch', 'is_correct': False},
                    {'text': 'Edward Jenner', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'easy',
                'marks': 2,
                'question_text': 'Who painted The Starry Night?',
                'standard': 'Standard 3',
                'subject': 'Art',
                'topic': 'Famous Paintings',
                'chapter': 'Modern Art',
                'options': [
                    {'text': 'Vincent van Gogh', 'is_correct': True},
                    {'text': 'Pablo Picasso', 'is_correct': False},
                    {'text': 'Leonardo da Vinci', 'is_correct': False},
                    {'text': 'Michelangelo', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'medium',
                'marks': 3,
                'question_text': 'Which gas is responsible for the greenhouse effect?',
                'standard': 'Standard 4',
                'subject': 'Environmental Science',
                'topic': 'Atmospheric Chemistry',
                'chapter': 'Greenhouse Gases',
                'options': [
                    {'text': 'Carbon dioxide', 'is_correct': True},
                    {'text': 'Oxygen', 'is_correct': False},
                    {'text': 'Nitrogen', 'is_correct': False},
                    {'text': 'Methane', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'hard',
                'marks': 5,
                'question_text': 'Who composed the famous symphony known as "Symphony No. 9"?',
                'standard': 'Standard 5',
                'subject': 'Music',
                'topic': 'Classical Music',
                'chapter': 'Composers',
                'options': [
                    {'text': 'Ludwig van Beethoven', 'is_correct': True},
                    {'text': 'Wolfgang Amadeus Mozart', 'is_correct': False},
                    {'text': 'Johann Sebastian Bach', 'is_correct': False},
                    {'text': 'Pyotr Ilyich Tchaikovsky', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'easy',
                'marks': 2,
                'question_text': 'Which of the following is a mammal?',
                'standard': 'Standard 6',
                'subject': 'Biology',
                'topic': 'Animal Classification',
                'chapter': 'Mammals',
                'options': [
                    {'text': 'Elephant', 'is_correct': True},
                    {'text': 'Crocodile', 'is_correct': False},
                    {'text': 'Turtle', 'is_correct': False},
                    {'text': 'Frog', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'medium',
                'marks': 3,
                'question_text': 'What is the capital of Australia?',
                'standard': 'Standard 7',
                'subject': 'Geography',
                'topic': 'Capitals',
                'chapter': 'Oceania',
                'options': [
                    {'text': 'Canberra', 'is_correct': True},
                    {'text': 'Sydney', 'is_correct': False},
                    {'text': 'Melbourne', 'is_correct': False},
                    {'text': 'Brisbane', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'hard',
                'marks': 5,
                'question_text': 'Who invented the World Wide Web?',
                'standard': 'Standard 8',
                'subject': 'Technology',
                'topic': 'Internet',
                'chapter': 'History of the Internet',
                'options': [
                    {'text': 'Tim Berners-Lee', 'is_correct': True},
                    {'text': 'Bill Gates', 'is_correct': False},
                    {'text': 'Steve Jobs', 'is_correct': False},
                    {'text': 'Mark Zuckerberg', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'easy',
                'marks': 2,
                'question_text': 'What is the currency of Japan?',
                'standard': 'Standard 9',
                'subject': 'Economics',
                'topic': 'Currencies',
                'chapter': 'World Currencies',
                'options': [
                    {'text': 'Yen', 'is_correct': True},
                    {'text': 'Euro', 'is_correct': False},
                    {'text': 'Dollar', 'is_correct': False},
                    {'text': 'Pound', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'medium',
                'marks': 3,
                'question_text': 'Who is the current President of the United States?',
                'standard': 'Standard 10',
                'subject': 'Social Studies',
                'topic': 'Government',
                'chapter': 'US Government',
                'options': [
                    {'text': 'Joe Biden', 'is_correct': True},
                    {'text': 'Donald Trump', 'is_correct': False},
                    {'text': 'Barack Obama', 'is_correct': False},
                    {'text': 'George W. Bush', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'hard',
                'marks': 5,
                'question_text': 'What is the boiling point of water in Fahrenheit?',
                'standard': 'Standard 1',
                'subject': 'Science',
                'topic': 'Chemistry',
                'chapter': 'States of Matter',
                'options': [
                    {'text': '212°F', 'is_correct': True},
                    {'text': '100°F', 'is_correct': False},
                    {'text': '0°F', 'is_correct': False},
                    {'text': '-40°F', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'medium',
                'marks': 3,
                'question_text': 'Who is the author of the novel "1984"?',
                'standard': 'Standard 2',
                'subject': 'Literature',
                'topic': 'Authors',
                'chapter': 'Dystopian Literature',
                'options': [
                    {'text': 'George Orwell', 'is_correct': True},
                    {'text': 'Aldous Huxley', 'is_correct': False},
                    {'text': 'Ray Bradbury', 'is_correct': False},
                    {'text': 'Philip K. Dick', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'easy',
                'marks': 2,
                'question_text': 'What is the largest organ in the human body?',
                'standard': 'Standard 3',
                'subject': 'Biology',
                'topic': 'Human Anatomy',
                'chapter': 'Organs',
                'options': [
                    {'text': 'Skin', 'is_correct': True},
                    {'text': 'Liver', 'is_correct': False},
                    {'text': 'Heart', 'is_correct': False},
                    {'text': 'Brain', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'hard',
                'marks': 5,
                'question_text': 'Which composer is known for his "Moonlight Sonata"?',
                'standard': 'Standard 4',
                'subject': 'Music',
                'topic': 'Classical Music',
                'chapter': 'Composers',
                'options': [
                    {'text': 'Ludwig van Beethoven', 'is_correct': True},
                    {'text': 'Wolfgang Amadeus Mozart', 'is_correct': False},
                    {'text': 'Johann Sebastian Bach', 'is_correct': False},
                    {'text': 'Franz Schubert', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'easy',
                'marks': 2,
                'question_text': 'What is the capital of Brazil?',
                'standard': 'Standard 5',
                'subject': 'Geography',
                'topic': 'Capitals',
                'chapter': 'South America',
                'options': [
                    {'text': 'Brasília', 'is_correct': True},
                    {'text': 'Rio de Janeiro', 'is_correct': False},
                    {'text': 'São Paulo', 'is_correct': False},
                    {'text': 'Buenos Aires', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'medium',
                'marks': 3,
                'question_text': 'Which element has the chemical symbol "Fe"?',
                'standard': 'Standard 6',
                'subject': 'Chemistry',
                'topic': 'Chemical Elements',
                'chapter': 'Periodic Table',
                'options': [
                    {'text': 'Iron', 'is_correct': True},
                    {'text': 'Gold', 'is_correct': False},
                    {'text': 'Silver', 'is_correct': False},
                    {'text': 'Lead', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'hard',
                'marks': 5,
                'question_text': 'Which artist is famous for his painting "The Persistence of Memory"?',
                'standard': 'Standard 7',
                'subject': 'Art',
                'topic': 'Famous Paintings',
                'chapter': 'Surrealism',
                'options': [
                    {'text': 'Salvador Dalí', 'is_correct': True},
                    {'text': 'Pablo Picasso', 'is_correct': False},
                    {'text': 'Vincent van Gogh', 'is_correct': False},
                    {'text': 'Leonardo da Vinci', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'easy',
                'marks': 2,
                'question_text': 'Which planet is closest to the Sun?',
                'standard': 'Standard 8',
                'subject': 'Science',
                'topic': 'Astronomy',
                'chapter': 'Planets',
                'options': [
                    {'text': 'Mercury', 'is_correct': True},
                    {'text': 'Venus', 'is_correct': False},
                    {'text': 'Earth', 'is_correct': False},
                    {'text': 'Mars', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'medium',
                'marks': 3,
                'question_text': 'Who painted the famous artwork "The Scream"?',
                'standard': 'Standard 9',
                'subject': 'Art',
                'topic': 'Famous Paintings',
                'chapter': 'Expressionism',
                'options': [
                    {'text': 'Edvard Munch', 'is_correct': True},
                    {'text': 'Claude Monet', 'is_correct': False},
                    {'text': 'Paul Cézanne', 'is_correct': False},
                    {'text': 'Georges Seurat', 'is_correct': False},
                ]
            },
            {
                'type': 'mcq',
                'difficulty_level': 'hard',
                'marks': 5,
                'question_text': 'In which year did the French Revolution begin?',
                'standard': 'Standard 10',
                'subject': 'History',
                'topic': 'French Revolution',
                'chapter': 'Causes and Events',
                'options': [
                    {'text': '1789', 'is_correct': True},
                    {'text': '1804', 'is_correct': False},
                    {'text': '1832', 'is_correct': False},
                    {'text': '1848', 'is_correct': False},
                ]
            },
        ]

        with transaction.atomic():
            self.create_questions(dummy_questions)

        self.stdout.write(self.style.SUCCESS('Successfully loaded dummy questions'))

    def create_questions(self, questions_data):
        for question_data in questions_data:
            # Create Standard objects if they don't exist
            standard, created = Standard.objects.get_or_create(name=question_data['standard'])

            # Create remaining related objects using get_or_create
            subject, _ = Subject.objects.get_or_create(name=question_data['subject'])
            chapter, _ = Chapter.objects.get_or_create(name=question_data['chapter'], subject=subject)
            topic, _ = Topic.objects.get_or_create(name=question_data['topic'], chapter=chapter)

            # Create question object
            question = Question.objects.create(
                type=question_data['type'],
                difficulty_level=question_data['difficulty_level'],
                marks=question_data['marks'],
                question_text=question_data['question_text'],
                standard=standard,
                subject=subject,
                topic=topic,
                chapter=chapter,
            )

            # Create options using bulk_create after the question is created
            options_data = question_data['options']
            options = [
                Option(text=option['text'], is_correct=option['is_correct'], question=question)
                for option in options_data
            ]
            Option.objects.bulk_create(options)

