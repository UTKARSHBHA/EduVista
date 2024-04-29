from django.core.management.base import BaseCommand
from django.db import transaction
from Questions.models import Question, Standard, Subject, Topic, Chapter, Option


class Command(BaseCommand):
    help = 'Loads dummy questions into the database'

    def handle(self, *args, **options):
        dummy_questions = [
    {
        'type': 'mcq',
        'difficulty_level': 'medium',
        'marks': 3,
        'question_text': 'What is the capital of France?',
        'standard': 'Standard 4',
        'subject': 'Geography',
        'chapter': 'European Capitals',
        'topics': ['Capitals', 'France'],
        'options': [
            {'text': 'Paris', 'is_correct': True},
            {'text': 'Berlin', 'is_correct': False},
            {'text': 'Rome', 'is_correct': False},
            {'text': 'Madrid', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'easy',
        'marks': 1,
        'question_text': 'What is the chemical symbol for oxygen?',
        'standard': 'Standard 2',
        'subject': 'Chemistry',
        'chapter': 'Chemical Elements',
        'topics': ['Chemical Symbols', 'Oxygen'],
        'options': [
            {'text': 'O', 'is_correct': False},
            {'text': 'O2', 'is_correct': True},
            {'text': 'O3', 'is_correct': False},
            {'text': 'H2O', 'is_correct': False},
        ]
    },
    {
        'type': 'tf',
        'difficulty_level': 'hard',
        'marks': 2,
        'question_text': 'The human body has five senses.',
        'standard': 'Standard 5',
        'subject': 'Biology',
        'chapter': 'Human Anatomy',
        'topics': ['Sensory Organs', 'Human Body'],
        'options': [
            {'text': 'True', 'is_correct': False},
            {'text': 'False', 'is_correct': True},
        ]
    },
    {
        'type': 'descriptive',
        'difficulty_level': 'medium',
        'marks': 4,
        'question_text': 'Explain the concept of supply and demand in economics.',
        'standard': 'Standard 4',
        'subject': 'Economics',
        'chapter': 'Microeconomics',
        'topics': ['Supply and Demand', 'Microeconomics'],
        'options': []  # No options for descriptive questions
    },
    {
        'type': 'mcq',
        'difficulty_level': 'hard',
        'marks': 5,
        'question_text': 'Who discovered the theory of evolution by natural selection?',
        'standard': 'Standard 5',
        'subject': 'Biology',
        'chapter': 'Evolution',
        'topics': ['Evolution', 'Natural Selection'],
        'options': [
            {'text': 'Charles Darwin', 'is_correct': True},
            {'text': 'Gregor Mendel', 'is_correct': False},
            {'text': 'Alfred Russel Wallace', 'is_correct': False},
            {'text': 'Jean-Baptiste Lamarck', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'easy',
        'marks': 1,
        'question_text': 'What is the largest planet in our solar system?',
        'standard': 'Standard 2',
        'subject': 'Science',
        'chapter': 'Planetary Science',
        'topics': ['Planets', 'Astronomy'],
        'options': [
            {'text': 'Jupiter', 'is_correct': True},
            {'text': 'Saturn', 'is_correct': False},
            {'text': 'Neptune', 'is_correct': False},
            {'text': 'Earth', 'is_correct': False},
        ]
    },
    {
        'type': 'tf',
        'difficulty_level': 'medium',
        'marks': 2,
        'question_text': 'Light travels faster than sound.',
        'standard': 'Standard 4',
        'subject': 'Physics',
        'chapter': 'Optics',
        'topics': ['Speed of Light', 'Physics'],
        'options': [
            {'text': 'True', 'is_correct': True},
            {'text': 'False', 'is_correct': False},
        ]
    },
    {
        'type': 'descriptive',
        'difficulty_level': 'hard',
        'marks': 5,
        'question_text': 'Discuss the impact of artificial intelligence on society.',
        'standard': 'Standard 5',
        'subject': 'Technology',
        'chapter': 'Artificial Intelligence',
        'topics': ['Artificial Intelligence', 'Society'],
        'options': []  # No options for descriptive questions
    },
    {
        'type': 'mcq',
        'difficulty_level': 'medium',
        'marks': 3,
        'question_text': 'What is the largest organ in the human body?',
        'standard': 'Standard 4',
        'subject': 'Biology',
        'chapter': 'Human Anatomy',
        'topics': ['Human Anatomy', 'Organs'],
        'options': [
            {'text': 'Liver', 'is_correct': False},
            {'text': 'Brain', 'is_correct': False},
            {'text': 'Skin', 'is_correct': True},
            {'text': 'Heart', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'easy',
        'marks': 1,
        'question_text': 'What is the chemical symbol for sodium?',
        'standard': 'Standard 2',
        'subject': 'Chemistry',
        'chapter': 'Chemical Elements',
        'topics': ['Chemical Symbols', 'Sodium'],
        'options': [
            {'text': 'S', 'is_correct': False},
            {'text': 'Na', 'is_correct': True},
            {'text': 'So', 'is_correct': False},
            {'text': 'NaCl', 'is_correct': False},
        ]
    },
    {
        'type': 'tf',
        'difficulty_level': 'hard',
        'marks': 2,
        'question_text': 'The Amazon River is the longest river in the world.',
        'standard': 'Standard 5',
        'subject': 'Geography',
        'chapter': 'Rivers',
        'topics': ['Amazon River', 'Geography'],
        'options': [
            {'text': 'True', 'is_correct': True},
            {'text': 'False', 'is_correct': False},
        ]
    },
    {
        'type': 'descriptive',
        'difficulty_level': 'medium',
        'marks': 4,
        'question_text': 'Explain the concept of inertia in physics.',
        'standard': 'Standard 4',
        'subject': 'Physics',
        'chapter': 'Mechanics',
        'topics': ['Inertia', 'Physics'],
        'options': []  # No options for descriptive questions
    },
    {
        'type': 'mcq',
        'difficulty_level': 'hard',
        'marks': 5,
        'question_text': 'Who composed the "Moonlight Sonata"?',
        'standard': 'Standard 5',
        'subject': 'Music',
        'chapter': 'Classical Music',
        'topics': ['Composers', 'Classical Music'],
        'options': [
            {'text': 'Ludwig van Beethoven', 'is_correct': True},
            {'text': 'Johann Sebastian Bach', 'is_correct': False},
            {'text': 'Wolfgang Amadeus Mozart', 'is_correct': False},
            {'text': 'Frederic Chopin', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'easy',
        'marks': 1,
        'question_text': 'What is the chemical symbol for helium?',
        'standard': 'Standard 2',
        'subject': 'Chemistry',
        'chapter': 'Chemical Elements',
        'topics': ['Chemical Symbols', 'Helium'],
        'options': [
            {'text': 'H', 'is_correct': False},
            {'text': 'He', 'is_correct': True},
            {'text': 'He2', 'is_correct': False},
            {'text': 'HeO', 'is_correct': False},
        ]
    },
    {
        'type': 'tf',
        'difficulty_level': 'medium',
        'marks': 2,
        'question_text': 'The Earth orbits the Sun.',
        'standard': 'Standard 4',
        'subject': 'Science',
        'chapter': 'Astronomy',
        'topics': ['Celestial Bodies', 'Astronomy'],
        'options': [
            {'text': 'True', 'is_correct': True},
            {'text': 'False', 'is_correct': False},
        ]
    },
    {
        'type': 'descriptive',
        'difficulty_level': 'hard',
        'marks': 5,
        'question_text': 'Explain the concept of quantum entanglement in physics.',
        'standard': 'Standard 5',
        'subject': 'Physics',
        'chapter': 'Quantum Mechanics',
        'topics': ['Quantum Entanglement', 'Physics'],
        'options': []  # No options for descriptive questions
    },
    {
        'type': 'mcq',
        'difficulty_level': 'medium',
        'marks': 3,
        'question_text': 'What is the powerhouse of the cell?',
        'standard': 'Standard 4',
        'subject': 'Biology',
        'chapter': 'Cell Biology',
        'topics': ['Cell Organelles', 'Cell Biology'],
        'options': [
            {'text': 'Nucleus', 'is_correct': False},
            {'text': 'Ribosome', 'is_correct': False},
            {'text': 'Mitochondrion', 'is_correct': True},
            {'text': 'Endoplasmic Reticulum', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'easy',
        'marks': 1,
        'question_text': 'What is the chemical symbol for carbon?',
        'standard': 'Standard 2',
        'subject': 'Chemistry',
        'chapter': 'Chemical Elements',
        'topics': ['Chemical Symbols', 'Carbon'],
        'options': [
            {'text': 'C', 'is_correct': True},
            {'text': 'Ca', 'is_correct': False},
            {'text': 'Co', 'is_correct': False},
            {'text': 'Cr', 'is_correct': False},
        ]
    },
    {
        'type': 'tf',
        'difficulty_level': 'hard',
        'marks': 2,
        'question_text': 'The Nile River is the longest river in the world.',
        'standard': 'Standard 5',
        'subject': 'Geography',
        'chapter': 'Rivers',
        'topics': ['Nile River', 'Geography'],
        'options': [
            {'text': 'True', 'is_correct': True},
            {'text': 'False', 'is_correct': False},
        ]
    },
    {
        'type': 'descriptive',
        'difficulty_level': 'medium',
        'marks': 4,
        'question_text': 'Explain the process of fermentation.',
        'standard': 'Standard 4',
        'subject': 'Chemistry',
        'chapter': 'Chemical Reactions',
        'topics': ['Fermentation', 'Chemistry'],
        'options': []  # No options for descriptive questions
    },
    {
        'type': 'mcq',
        'difficulty_level': 'hard',
        'marks': 5,
        'question_text': 'Who wrote "The Catcher in the Rye"?',
        'standard': 'Standard 5',
        'subject': 'Literature',
        'chapter': 'Modern Literature',
        'topics': ['Authors', 'Literature'],
        'options': [
            {'text': 'J.D. Salinger', 'is_correct': True},
            {'text': 'Ernest Hemingway', 'is_correct': False},
            {'text': 'F. Scott Fitzgerald', 'is_correct': False},
            {'text': 'William Faulkner', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'easy',
        'marks': 1,
        'question_text': 'What is the chemical symbol for iron?',
        'standard': 'Standard 2',
        'subject': 'Chemistry',
        'chapter': 'Chemical Elements',
        'topics': ['Chemical Symbols', 'Iron'],
        'options': [
            {'text': 'Fe', 'is_correct': True},
            {'text': 'Ir', 'is_correct': False},
            {'text': 'In', 'is_correct': False},
            {'text': 'I', 'is_correct': False},
        ]
    },
    {
        'type': 'tf',
        'difficulty_level': 'medium',
        'marks': 2,
        'question_text': 'Mount Everest is the tallest mountain on Earth.',
        'standard': 'Standard 4',
        'subject': 'Geography',
        'chapter': 'Mountains',
        'topics': ['Mount Everest', 'Geography'],
        'options': [
            {'text': 'True', 'is_correct': True},
            {'text': 'False', 'is_correct': False},
        ]
    },
    {
        'type': 'descriptive',
        'difficulty_level': 'hard',
        'marks': 5,
        'question_text': 'Explain the concept of cognitive dissonance in psychology.',
        'standard': 'Standard 5',
        'subject': 'Psychology',
        'chapter': 'Cognitive Psychology',
        'topics': ['Cognitive Dissonance', 'Psychology'],
        'options': []  # No options for descriptive questions
    },
    {
        'type': 'mcq',
        'difficulty_level': 'medium',
        'marks': 3,
        'question_text': 'What is the capital of Japan?',
        'standard': 'Standard 4',
        'subject': 'Geography',
        'chapter': 'Asian Capitals',
        'topics': ['Capitals', 'Japan'],
        'options': [
            {'text': 'Beijing', 'is_correct': False},
            {'text': 'Tokyo', 'is_correct': True},
            {'text': 'Seoul', 'is_correct': False},
            {'text': 'Bangkok', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'easy',
        'marks': 1,
        'question_text': 'What is the chemical symbol for potassium?',
        'standard': 'Standard 2',
        'subject': 'Chemistry',
        'chapter': 'Chemical Elements',
        'topics': ['Chemical Symbols', 'Potassium'],
        'options': [
            {'text': 'K', 'is_correct': True},
            {'text': 'P', 'is_correct': False},
            {'text': 'Po', 'is_correct': False},
            {'text': 'Ko', 'is_correct': False},
        ]
    },
    {
        'type': 'tf',
        'difficulty_level': 'hard',
        'marks': 2,
        'question_text': 'The Sahara Desert is the largest desert in the world.',
        'standard': 'Standard 5',
        'subject': 'Geography',
        'chapter': 'Deserts',
        'topics': ['Sahara Desert', 'Geography'],
        'options': [
            {'text': 'True', 'is_correct': True},
            {'text': 'False', 'is_correct': False},
        ]
    },
    {
        'type': 'descriptive',
        'difficulty_level': 'medium',
        'marks': 4,
        'question_text': 'Explain the process of photosynthesis in plants.',
        'standard': 'Standard 4',
        'subject': 'Biology',
        'chapter': 'Photosynthesis',
        'topics': ['Photosynthesis', 'Botany'],
        'options': []  # No options for descriptive questions
    },
    {
        'type': 'mcq',
        'difficulty_level': 'hard',
        'marks': 5,
        'question_text': 'Who discovered penicillin?',
        'standard': 'Standard 5',
        'subject': 'Biology',
        'chapter': 'Microbiology',
        'topics': ['Discoveries', 'Microorganisms'],
        'options': [
            {'text': 'Alexander Fleming', 'is_correct': True},
            {'text': 'Louis Pasteur', 'is_correct': False},
            {'text': 'Marie Curie', 'is_correct': False},
            {'text': 'Gregor Mendel', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'medium',
        'marks': 3,
        'question_text': 'What is the chemical symbol for gold?',
        'standard': 'Standard 4',
        'subject': 'Chemistry',
        'chapter': 'Elements',
        'topics': ['Chemical Elements', 'Periodic Table'],
        'options': [
            {'text': 'Au', 'is_correct': True},
            {'text': 'Ag', 'is_correct': False},
            {'text': 'Cu', 'is_correct': False},
            {'text': 'Fe', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'easy',
        'marks': 1,
        'question_text': 'Who discovered the theory of relativity?',
        'standard': 'Standard 2',
        'subject': 'Physics',
        'chapter': 'Relativity',
        'topics': ['Physics Theories', 'Albert Einstein'],
        'options': [
            {'text': 'Isaac Newton', 'is_correct': False},
            {'text': 'Albert Einstein', 'is_correct': True},
            {'text': 'Stephen Hawking', 'is_correct': False},
            {'text': 'Galileo Galilei', 'is_correct': False},
        ]
    },
    {
        'type': 'tf',
        'difficulty_level': 'hard',
        'marks': 2,
        'question_text': 'The Great Wall of China is visible from space.',
        'standard': 'Standard 5',
        'subject': 'Geography',
        'chapter': 'Landmarks',
        'topics': ['Great Wall of China', 'Geography'],
        'options': [
            {'text': 'True', 'is_correct': False},
            {'text': 'False', 'is_correct': True},
        ]
    },
    {
        'type': 'descriptive',
        'difficulty_level': 'medium',
        'marks': 4,
        'question_text': 'Explain the greenhouse effect and its impact on climate change.',
        'standard': 'Standard 4',
        'subject': 'Environmental Science',
        'chapter': 'Climate Change',
        'topics': ['Greenhouse Effect', 'Climate Science'],
        'options': []  # No options for descriptive questions
    },
    {
        'type': 'mcq',
        'difficulty_level': 'medium',
        'marks': 3,
        'question_text': 'Who is the author of the novel "1984"?',
        'standard': 'Standard 4',
        'subject': 'Literature',
        'chapter': 'Modern Literature',
        'topics': ['Authors', 'Literature'],
        'options': [
            {'text': 'George Orwell', 'is_correct': True},
            {'text': 'Ernest Hemingway', 'is_correct': False},
            {'text': 'F. Scott Fitzgerald', 'is_correct': False},
            {'text': 'Jane Austen', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'easy',
        'marks': 1,
        'question_text': 'Who discovered the theory of relativity?',
        'standard': 'Standard 2',
        'subject': 'Physics',
        'chapter': 'Relativity',
        'topics': ['Physics Theories', 'Albert Einstein'],
        'options': [
            {'text': 'Isaac Newton', 'is_correct': False},
            {'text': 'Albert Einstein', 'is_correct': True},
            {'text': 'Stephen Hawking', 'is_correct': False},
            {'text': 'Galileo Galilei', 'is_correct': False},
        ]
    },
    {
        'type': 'tf',
        'difficulty_level': 'hard',
        'marks': 2,
        'question_text': 'The Great Wall of China is visible from space.',
        'standard': 'Standard 5',
        'subject': 'Geography',
        'chapter': 'Landmarks',
        'topics': ['Great Wall of China', 'Geography'],
        'options': [
            {'text': 'True', 'is_correct': False},
            {'text': 'False', 'is_correct': True},
        ]
    },
    {
        'type': 'descriptive',
        'difficulty_level': 'medium',
        'marks': 4,
        'question_text': 'Explain the greenhouse effect and its impact on climate change.',
        'standard': 'Standard 4',
        'subject': 'Environmental Science',
        'chapter': 'Climate Change',
        'topics': ['Greenhouse Effect', 'Climate Science'],
        'options': []  # No options for descriptive questions
    },
    {
        'type': 'mcq',
        'difficulty_level': 'medium',
        'marks': 3,
        'question_text': 'What is the capital of Brazil?',
        'standard': 'Standard 4',
        'subject': 'Geography',
        'chapter': 'South American Capitals',
        'topics': ['Capitals', 'Brazil'],
        'options': [
            {'text': 'Rio de Janeiro', 'is_correct': False},
            {'text': 'São Paulo', 'is_correct': False},
            {'text': 'Brasília', 'is_correct': True},
            {'text': 'Salvador', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'easy',
        'marks': 1,
        'question_text': 'What is the chemical symbol for silver?',
        'standard': 'Standard 2',
        'subject': 'Chemistry',
        'chapter': 'Chemical Elements',
        'topics': ['Chemical Symbols', 'Silver'],
        'options': [
            {'text': 'Si', 'is_correct': False},
            {'text': 'Ag', 'is_correct': True},
            {'text': 'Au', 'is_correct': False},
            {'text': 'Sr', 'is_correct': False},
        ]
    },
    {
        'type': 'tf',
        'difficulty_level': 'hard',
        'marks': 2,
        'question_text': 'The Sahara Desert is the largest desert in the world.',
        'standard': 'Standard 5',
        'subject': 'Geography',
        'chapter': 'Deserts',
        'topics': ['Sahara Desert', 'Geography'],
        'options': [
            {'text': 'True', 'is_correct': True},
            {'text': 'False', 'is_correct': False},
        ]
    },
    {
        'type': 'descriptive',
        'difficulty_level': 'medium',
        'marks': 4,
        'question_text': 'Explain the process of protein synthesis in cells.',
        'standard': 'Standard 4',
        'subject': 'Biology',
        'chapter': 'Cell Biology',
        'topics': ['Protein Synthesis', 'Cell Biology'],
        'options': []  # No options for descriptive questions
    },
    {
        'type': 'mcq',
        'difficulty_level': 'hard',
        'marks': 5,
        'question_text': 'Who painted the Mona Lisa?',
        'standard': 'Standard 5',
        'subject': 'Art',
        'chapter': 'Renaissance Art',
        'topics': ['Art History', 'Leonardo da Vinci'],
        'options': [
            {'text': 'Vincent van Gogh', 'is_correct': False},
            {'text': 'Pablo Picasso', 'is_correct': False},
            {'text': 'Michelangelo', 'is_correct': False},
            {'text': 'Leonardo da Vinci', 'is_correct': True},
        ]
    },{
        'type': 'mcq',
        'difficulty_level': 'medium',
        'marks': 3,
        'question_text': 'What is the capital of Australia?',
        'standard': 'Standard 4',
        'subject': 'Geography',
        'chapter': 'Oceania Capitals',
        'topics': ['Capitals', 'Australia'],
        'options': [
            {'text': 'Sydney', 'is_correct': False},
            {'text': 'Melbourne', 'is_correct': False},
            {'text': 'Canberra', 'is_correct': True},
            {'text': 'Perth', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'easy',
        'marks': 1,
        'question_text': 'What is the chemical symbol for potassium?',
        'standard': 'Standard 2',
        'subject': 'Chemistry',
        'chapter': 'Chemical Elements',
        'topics': ['Chemical Symbols', 'Potassium'],
        'options': [
            {'text': 'K', 'is_correct': True},
            {'text': 'P', 'is_correct': False},
            {'text': 'Po', 'is_correct': False},
            {'text': 'Ko', 'is_correct': False},
        ]
    },
    {
        'type': 'tf',
        'difficulty_level': 'hard',
        'marks': 2,
        'question_text': 'The Great Barrier Reef is the largest coral reef system in the world.',
        'standard': 'Standard 5',
        'subject': 'Geography',
        'chapter': 'Coral Reefs',
        'topics': ['Great Barrier Reef', 'Geography'],
        'options': [
            {'text': 'True', 'is_correct': True},
            {'text': 'False', 'is_correct': False},
        ]
    },
    {
        'type': 'descriptive',
        'difficulty_level': 'medium',
        'marks': 4,
        'question_text': 'Explain the process of meiosis in genetics.',
        'standard': 'Standard 4',
        'subject': 'Biology',
        'chapter': 'Genetics',
        'topics': ['Meiosis', 'Genetics'],
        'options': []  # No options for descriptive questions
    },
    {
        'type': 'mcq',
        'difficulty_level': 'hard',
        'marks': 5,
        'question_text': 'Who wrote "Hamlet"?',
        'standard': 'Standard 5',
        'subject': 'Literature',
        'chapter': 'Shakespearean Plays',
        'topics': ['Authors', 'Literature'],
        'options': [
            {'text': 'William Shakespeare', 'is_correct': True},
            {'text': 'John Milton', 'is_correct': False},
            {'text': 'Homer', 'is_correct': False},
            {'text': 'Jane Austen', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'medium',
        'marks': 3,
        'question_text': 'What is the chemical formula for water?',
        'standard': 'Standard 4',
        'subject': 'Chemistry',
        'chapter': 'Chemical Compounds',
        'topics': ['Chemical Formulas', 'Water'],
        'options': [
            {'text': 'H2O2', 'is_correct': False},
            {'text': 'HO', 'is_correct': False},
            {'text': 'H2O', 'is_correct': True},
            {'text': 'H3O', 'is_correct': False},
        ]
    },
    {
        'type': 'mcq',
        'difficulty_level': 'easy',
        'marks': 1,
        'question_text': 'What is the chemical symbol for gold?',
        'standard': 'Standard 2',
        'subject': 'Chemistry',
        'chapter': 'Chemical Elements',
        'topics': ['Chemical Symbols', 'Gold'],
        'options': [
            {'text': 'G', 'is_correct': False},
            {'text': 'Au', 'is_correct': True},
            {'text': 'Ag', 'is_correct': False},
            {'text': 'A', 'is_correct': False},
        ]
    },
    {
        'type': 'tf',
        'difficulty_level': 'hard',
        'marks': 2,
        'question_text': 'Mount Kilimanjaro is the tallest mountain in Africa.',
        'standard': 'Standard 5',
        'subject': 'Geography',
        'chapter': 'Mountains',
        'topics': ['Mount Kilimanjaro', 'Geography'],
        'options': [
            {'text': 'True', 'is_correct': True},
            {'text': 'False', 'is_correct': False},
        ]
    },
    {
        'type': 'descriptive',
        'difficulty_level': 'medium',
        'marks': 4,
        'question_text': 'Explain the process of osmosis in biology.',
        'standard': 'Standard 4',
        'subject': 'Biology',
        'chapter': 'Cell Biology',
        'topics': ['Osmosis', 'Cell Biology'],
        'options': []  # No options for descriptive questions
    },
    {
        'type': 'mcq',
        'difficulty_level': 'hard',
        'marks': 5,
        'question_text': 'Who painted "Starry Night"?',
        'standard': 'Standard 5',
        'subject': 'Art',
        'chapter': 'Post-Impressionist Art',
        'topics': ['Art History', 'Vincent van Gogh'],
        'options': [
            {'text': 'Vincent van Gogh', 'is_correct': True},
            {'text': 'Pablo Picasso', 'is_correct': False},
            {'text': 'Leonardo da Vinci', 'is_correct': False},
            {'text': 'Claude Monet', 'is_correct': False},
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
            standard.subjects.add(subject)

            chapter, _ = Chapter.objects.get_or_create(name=question_data['chapter'], subject=subject)

            # Create question object
            question = Question.objects.create(
                type=question_data['type'],
                difficulty_level=question_data['difficulty_level'],
                marks=question_data['marks'],
                question_text=question_data['question_text'],
                standard=standard,
                subject=subject,
                chapter=chapter,
            )

            # Create topics and associate them with the question
            if 'topics' in question_data:
                for topic_name in question_data['topics']:
                    topic, created = Topic.objects.get_or_create(name=topic_name, chapter=chapter)
                    question.topics.add(topic)

            # Create options using bulk_create after the question is created
            if question_data['type'] != 'descriptive':
                options_data = question_data['options']
                options = [
                    Option(text=option['text'], is_correct=option['is_correct'], question=question)
                    for option in options_data
                ]
                Option.objects.bulk_create(options)