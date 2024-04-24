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
        'type': 'tf',
        'difficulty_level': 'medium',
        'marks': 2,
        'question_text': 'The Amazon River is the longest river in the world.',
        'standard': 'Standard 2',
        'subject': 'Geography',
        'topic': 'Rivers',
        'chapter': 'South America',
        'options': [
            {'text': 'True', 'is_correct': True},
            {'text': 'False', 'is_correct': False},
        ]
    },
    {
        'type': 'descriptive',
        'difficulty_level': 'easy',
        'marks': 1,
        'question_text': 'Explain the process of photosynthesis.',
        'standard': 'Standard 3',
        'subject': 'Biology',
        'topic': 'Plant Biology',
        'chapter': 'Photosynthesis',
    },
    {
        'type': 'mcq',
        'difficulty_level': 'easy',
        'marks': 2,
        'question_text': 'What is the chemical symbol for water?',
        'standard': 'Standard 1',
        'subject': 'Chemistry',
        'topic': 'Elements',
        'chapter': 'Water',
        'options': [
            {'text': 'H2O', 'is_correct': True},
            {'text': 'CO2', 'is_correct': False},
            {'text': 'NaCl', 'is_correct': False},
            {'text': 'O2', 'is_correct': False},
        ]
    },{
    'type': 'tf',
    'difficulty_level': 'hard',
    'marks': 5,
    'question_text': 'The Great Wall of China is visible from space.',
    'standard': 'Standard 4',
    'subject': 'History',
    'topic': 'World Wonders',
    'chapter': 'Ancient Civilizations',
    'options': [
        {'text': 'True', 'is_correct': False},
        {'text': 'False', 'is_correct': True},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'medium',
    'marks': 10,
    'question_text': 'Who developed the theory of relativity?',
    'standard': 'Standard 5',
    'subject': 'Physics',
    'topic': 'Modern Physics',
    'chapter': 'Theories of Relativity',
    'options': [
        {'text': 'Isaac Newton', 'is_correct': False},
        {'text': 'Albert Einstein', 'is_correct': True},
        {'text': 'Galileo Galilei', 'is_correct': False},
        {'text': 'Stephen Hawking', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Discuss the impact of climate change on global biodiversity.',
    'standard': 'Standard 5',
    'subject': 'Environmental Science',
    'topic': 'Climate Change',
    'chapter': 'Ecological Impacts',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'What is the nearest planet to the Sun?',
    'standard': 'Standard 2',
    'subject': 'Astronomy',
    'topic': 'Planetary Science',
    'chapter': 'The Solar System',
    'options': [
        {'text': 'Mercury', 'is_correct': True},
        {'text': 'Venus', 'is_correct': False},
        {'text': 'Earth', 'is_correct': False},
        {'text': 'Mars', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'The Earth revolves around the Sun.',
    'standard': 'Standard 3',
    'subject': 'Science',
    'topic': 'Astronomy',
    'chapter': 'Celestial Bodies',
    'options': [
        {'text': 'True', 'is_correct': True},
        {'text': 'False', 'is_correct': False},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'medium',
    'marks': 5,
    'question_text': 'Who wrote "To Kill a Mockingbird"?',
    'standard': 'Standard 4',
    'subject': 'Literature',
    'topic': 'Modern Classics',
    'chapter': 'American Literature',
    'options': [
        {'text': 'Harper Lee', 'is_correct': True},
        {'text': 'Ernest Hemingway', 'is_correct': False},
        {'text': 'Mark Twain', 'is_correct': False},
        {'text': 'J.K. Rowling', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'Explain the process of mitosis.',
    'standard': 'Standard 2',
    'subject': 'Biology',
    'topic': 'Cell Biology',
    'chapter': 'Cell Division',
},
{
    'type': 'mcq',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Which scientist proposed the theory of natural selection?',
    'standard': 'Standard 5',
    'subject': 'Biology',
    'topic': 'Evolution',
    'chapter': 'Darwinian Evolution',
    'options': [
        {'text': 'Charles Darwin', 'is_correct': True},
        {'text': 'Gregor Mendel', 'is_correct': False},
        {'text': 'Louis Pasteur', 'is_correct': False},
        {'text': 'Alexander Fleming', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'Mount Everest is the tallest mountain in the world.',
    'standard': 'Standard 3',
    'subject': 'Geography',
    'topic': 'Mountains',
    'chapter': 'Mountain Geography',
    'options': [
        {'text': 'True', 'is_correct': True},
        {'text': 'False', 'is_correct': False},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'hard',
    'marks': 5,
    'question_text': 'What is the chemical formula for table salt?',
    'standard': 'Standard 4',
    'subject': 'Chemistry',
    'topic': 'Chemical Compounds',
    'chapter': 'Ionic Compounds',
    'options': [
        {'text': 'NaCl', 'is_correct': True},
        {'text': 'H2O', 'is_correct': False},
        {'text': 'CO2', 'is_correct': False},
        {'text': 'O2', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'Define the term "velocity".',
    'standard': 'Standard 1',
    'subject': 'Physics',
    'topic': 'Motion',
    'chapter': 'Kinematics',
},
{
    'type': 'mcq',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'Who painted the Mona Lisa?',
    'standard': 'Standard 2',
    'subject': 'Art',
    'topic': 'Renaissance Art',
    'chapter': 'Leonardo da Vinci',
    'options': [
        {'text': 'Leonardo da Vinci', 'is_correct': True},
        {'text': 'Pablo Picasso', 'is_correct': False},
        {'text': 'Vincent van Gogh', 'is_correct': False},
        {'text': 'Michelangelo', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'hard',
    'marks': 5,
    'question_text': 'The human body has 206 bones.',
    'standard': 'Standard 3',
    'subject': 'Biology',
    'topic': 'Anatomy',
    'chapter': 'Skeletal System',
    'options': [
        {'text': 'True', 'is_correct': False},
        {'text': 'False', 'is_correct': True},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'Which planet is known as the "Red Planet"?',
    'standard': 'Standard 1',
    'subject': 'Astronomy',
    'topic': 'Planetary Science',
    'chapter': 'The Solar System',
    'options': [
        {'text': 'Mars', 'is_correct': True},
        {'text': 'Venus', 'is_correct': False},
        {'text': 'Mercury', 'is_correct': False},
        {'text': 'Jupiter', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'Discuss the impact of globalization on culture.',
    'standard': 'Standard 4',
    'subject': 'Social Studies',
    'topic': 'Globalization',
    'chapter': 'Cultural Exchange',
},
{
    'type': 'mcq',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Who discovered penicillin?',
    'standard': 'Standard 5',
    'subject': 'Biology',
    'topic': 'Medicine',
    'chapter': 'Antibiotics',
    'options': [
        {'text': 'Alexander Fleming', 'is_correct': True},
        {'text': 'Louis Pasteur', 'is_correct': False},
        {'text': 'Edward Jenner', 'is_correct': False},
        {'text': 'Jonas Salk', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'Water boils at 100 degrees Celsius.',
    'standard': 'Standard 2',
    'subject': 'Science',
    'topic': 'States of Matter',
    'chapter': 'Thermodynamics',
    'options': [
        {'text': 'True', 'is_correct': True},
        {'text': 'False', 'is_correct': False},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'medium',
    'marks': 5,
    'question_text': 'Who was the first woman to win a Nobel Prize?',
    'standard': 'Standard 3',
    'subject': 'History',
    'topic': 'Achievements',
    'chapter': 'Nobel Laureates',
    'options': [
        {'text': 'Marie Curie', 'is_correct': True},
        {'text': 'Rosa Parks', 'is_correct': False},
        {'text': 'Mother Teresa', 'is_correct': False},
        {'text': 'Jane Goodall', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Explain the process of nuclear fusion in stars.',
    'standard': 'Standard 4',
    'subject': 'Physics',
    'topic': 'Astrophysics',
    'chapter': 'Stellar Evolution',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 2,
    'question_text': 'Which gas makes up the majority of Earth\'s atmosphere?',
    'standard': 'Standard 1',
    'subject': 'Environmental Science',
    'topic': 'Atmosphere',
    'chapter': 'Composition of Air',
    'options': [
        {'text': 'Nitrogen', 'is_correct': True},
        {'text': 'Oxygen', 'is_correct': False},
        {'text': 'Carbon dioxide', 'is_correct': False},
        {'text': 'Argon', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'Sound travels faster in water than in air.',
    'standard': 'Standard 2',
    'subject': 'Physics',
    'topic': 'Sound',
    'chapter': 'Properties of Sound',
    'options': [
        {'text': 'True', 'is_correct': False},
        {'text': 'False', 'is_correct': True},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'hard',
    'marks': 5,
    'question_text': 'Who wrote the famous play "Romeo and Juliet"?',
    'standard': 'Standard 3',
    'subject': 'Literature',
    'topic': 'Drama',
    'chapter': 'Shakespearean Literature',
    'options': [
        {'text': 'William Shakespeare', 'is_correct': True},
        {'text': 'George Bernard Shaw', 'is_correct': False},
        {'text': 'Arthur Miller', 'is_correct': False},
        {'text': 'Oscar Wilde', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'Define the term "acceleration".',
    'standard': 'Standard 1',
    'subject': 'Physics',
    'topic': 'Motion',
    'chapter': 'Kinematics',
},
{
    'type': 'mcq',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'Who is credited with inventing the telephone?',
    'standard': 'Standard 4',
    'subject': 'History',
    'topic': 'Inventions',
    'chapter': 'Communication',
    'options': [
        {'text': 'Alexander Graham Bell', 'is_correct': True},
        {'text': 'Thomas Edison', 'is_correct': False},
        {'text': 'Nikola Tesla', 'is_correct': False},
        {'text': 'Guglielmo Marconi', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'The moon orbits the Earth.',
    'standard': 'Standard 2',
    'subject': 'Science',
    'topic': 'Astronomy',
    'chapter': 'Celestial Bodies',
    'options': [
        {'text': 'True', 'is_correct': True},
        {'text': 'False', 'is_correct': False},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'hard',
    'marks': 5,
    'question_text': 'What is the largest organ in the human body?',
    'standard': 'Standard 3',
    'subject': 'Biology',
    'topic': 'Human Anatomy',
    'chapter': 'Organ Systems',
    'options': [
        {'text': 'Skin', 'is_correct': True},
        {'text': 'Liver', 'is_correct': False},
        {'text': 'Heart', 'is_correct': False},
        {'text': 'Brain', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'Explain the greenhouse effect and its impact on climate change.',
    'standard': 'Standard 4',
    'subject': 'Environmental Science',
    'topic': 'Climate Change',
    'chapter': 'Greenhouse Gases',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'What is the chemical symbol for gold?',
    'standard': 'Standard 1',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Transition Metals',
    'options': [
        {'text': 'Au', 'is_correct': True},
        {'text': 'Ag', 'is_correct': False},
        {'text': 'Fe', 'is_correct': False},
        {'text': 'Cu', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'hard',
    'marks': 5,
    'question_text': 'Entropy in a closed system always increases.',
    'standard': 'Standard 5',
    'subject': 'Physics',
    'topic': 'Thermodynamics',
    'chapter': 'Entropy',
    'options': [
        {'text': 'True', 'is_correct': True},
        {'text': 'False', 'is_correct': False},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'medium',
    'marks': 5,
    'question_text': 'Who was the first person to set foot on the moon?',
    'standard': 'Standard 4',
    'subject': 'Astronomy',
    'topic': 'Space Exploration',
    'chapter': 'Moon Missions',
    'options': [
        {'text': 'Neil Armstrong', 'is_correct': True},
        {'text': 'Buzz Aldrin', 'is_correct': False},
        {'text': 'Yuri Gagarin', 'is_correct': False},
        {'text': 'John Glenn', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Explain the concept of quantum entanglement.',
    'standard': 'Standard 5',
    'subject': 'Physics',
    'topic': 'Quantum Mechanics',
    'chapter': 'Quantum Phenomena',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'What is the chemical symbol for carbon?',
    'standard': 'Standard 2',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Non-Metals',
    'options': [
        {'text': 'C', 'is_correct': True},
        {'text': 'Ca', 'is_correct': False},
        {'text': 'Co', 'is_correct': False},
        {'text': 'Cu', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'Sound travels faster in water than in air.',
    'standard': 'Standard 1',
    'subject': 'Physics',
    'topic': 'Waves',
    'chapter': 'Sound Waves',
    'options': [
        {'text': 'True', 'is_correct': False},
        {'text': 'False', 'is_correct': True},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'medium',
    'marks': 5,
    'question_text': 'Who is known as the "Father of Modern Physics"?',
    'standard': 'Standard 3',
    'subject': 'Physics',
    'topic': 'Modern Physics',
    'chapter': 'Key Figures',
    'options': [
        {'text': 'Albert Einstein', 'is_correct': True},
        {'text': 'Isaac Newton', 'is_correct': False},
        {'text': 'Niels Bohr', 'is_correct': False},
        {'text': 'Max Planck', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Discuss the implications of Heisenberg\'s Uncertainty Principle in quantum mechanics.',
    'standard': 'Standard 4',
    'subject': 'Physics',
    'topic': 'Quantum Mechanics',
    'chapter': 'Uncertainty Principle',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 2,
    'question_text': 'Which gas is responsible for the ozone layer depletion?',
    'standard': 'Standard 2',
    'subject': 'Environmental Science',
    'topic': 'Atmospheric Chemistry',
    'chapter': 'Ozone Depletion',
    'options': [
        {'text': 'Chlorofluorocarbons (CFCs)', 'is_correct': True},
        {'text': 'Carbon dioxide (CO2)', 'is_correct': False},
        {'text': 'Nitrous oxide (N2O)', 'is_correct': False},
        {'text': 'Methane (CH4)', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'Viruses are considered living organisms.',
    'standard': 'Standard 3',
    'subject': 'Biology',
    'topic': 'Microbiology',
    'chapter': 'Virology',
    'options': [
        {'text': 'True', 'is_correct': False},
        {'text': 'False', 'is_correct': True},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'hard',
    'marks': 5,
    'question_text': 'What is the name of the galaxy that contains the Solar System?',
    'standard': 'Standard 4',
    'subject': 'Astronomy',
    'topic': 'Galaxies',
    'chapter': 'The Milky Way',
    'options': [
        {'text': 'Milky Way', 'is_correct': True},
        {'text': 'Andromeda', 'is_correct': False},
        {'text': 'Triangulum', 'is_correct': False},
        {'text': 'Sombrero', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Discuss the process of protein synthesis in cells.',
    'standard': 'Standard 5',
    'subject': 'Biology',
    'topic': 'Cell Biology',
    'chapter': 'Molecular Genetics',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'Which planet is known as the "Morning Star"?',
    'standard': 'Standard 1',
    'subject': 'Astronomy',
    'topic': 'Planetary Science',
    'chapter': 'The Solar System',
    'options': [
        {'text': 'Venus', 'is_correct': True},
        {'text': 'Mercury', 'is_correct': False},
        {'text': 'Mars', 'is_correct': False},
        {'text': 'Jupiter', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'The Earth is the third planet from the Sun.',
    'standard': 'Standard 2',
    'subject': 'Astronomy',
    'topic': 'Planetary Science',
    'chapter': 'The Solar System',
    'options': [
        {'text': 'True', 'is_correct': True},
        {'text': 'False', 'is_correct': False},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'medium',
    'marks': 5,
    'question_text': 'Who developed the theory of general relativity?',
    'standard': 'Standard 3',
    'subject': 'Physics',
    'topic': 'Modern Physics',
    'chapter': 'Theories of Relativity',
    'options': [
        {'text': 'Albert Einstein', 'is_correct': True},
        {'text': 'Isaac Newton', 'is_correct': False},
        {'text': 'Stephen Hawking', 'is_correct': False},
        {'text': 'Niels Bohr', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Explain the process of cellular respiration in detail.',
    'standard': 'Standard 4',
    'subject': 'Biology',
    'topic': 'Cellular Processes',
    'chapter': 'Cellular Respiration',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 2,
    'question_text': 'What is the chemical symbol for sodium?',
    'standard': 'Standard 1',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Alkali Metals',
    'options': [
        {'text': 'Na', 'is_correct': True},
        {'text': 'Ni', 'is_correct': False},
        {'text': 'Ne', 'is_correct': False},
        {'text': 'N', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'Plants conduct photosynthesis during the day and cellular respiration at night.',
    'standard': 'Standard 2',
    'subject': 'Biology',
    'topic': 'Plant Physiology',
    'chapter': 'Metabolism',
    'options': [
        {'text': 'True', 'is_correct': True},
        {'text': 'False', 'is_correct': False},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'hard',
    'marks': 5,
    'question_text': 'Which of the following elements is a halogen?',
    'standard': 'Standard 3',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Periodic Table',
    'options': [
        {'text': 'Fluorine', 'is_correct': True},
        {'text': 'Sodium', 'is_correct': False},
        {'text': 'Aluminum', 'is_correct': False},
        {'text': 'Calcium', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Discuss the impact of deforestation on biodiversity and climate change.',
    'standard': 'Standard 4',
    'subject': 'Environmental Science',
    'topic': 'Ecosystems',
    'chapter': 'Deforestation',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'What is the chemical symbol for helium?',
    'standard': 'Standard 1',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Noble Gases',
    'options': [
        {'text': 'He', 'is_correct': True},
        {'text': 'H', 'is_correct': False},
        {'text': 'Ha', 'is_correct': False},
        {'text': 'Hu', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'The chemical symbol for iron is Fe.',
    'standard': 'Standard 2',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Transition Metals',
    'options': [
        {'text': 'True', 'is_correct': True},
        {'text': 'False', 'is_correct': False},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'medium',
    'marks': 5,
    'question_text': 'Who discovered the electron?',
    'standard': 'Standard 3',
    'subject': 'Physics',
    'topic': 'Atomic Structure',
    'chapter': 'Subatomic Particles',
    'options': [
        {'text': 'J.J. Thomson', 'is_correct': True},
        {'text': 'Ernest Rutherford', 'is_correct': False},
        {'text': 'Niels Bohr', 'is_correct': False},
        {'text': 'Max Planck', 'is_correct': False},
    ]
},

{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 2,
    'question_text': 'Which planet is known as the "Red Planet"?',
    'standard': 'Standard 1',
    'subject': 'Astronomy',
    'topic': 'Planetary Science',
    'chapter': 'The Solar System',
    'options': [
        {'text': 'Mars', 'is_correct': True},
        {'text': 'Venus', 'is_correct': False},
        {'text': 'Mercury', 'is_correct': False},
        {'text': 'Jupiter', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'Viruses are considered living organisms.',
    'standard': 'Standard 2',
    'subject': 'Biology',
    'topic': 'Microbiology',
    'chapter': 'Virology',
    'options': [
        {'text': 'True', 'is_correct': False},
        {'text': 'False', 'is_correct': True},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'hard',
    'marks': 5,
    'question_text': 'Which of the following elements is a halogen?',
    'standard': 'Standard 3',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Periodic Table',
    'options': [
        {'text': 'Fluorine', 'is_correct': True},
        {'text': 'Sodium', 'is_correct': False},
        {'text': 'Aluminum', 'is_correct': False},
        {'text': 'Calcium', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Discuss the impact of deforestation on biodiversity and climate change.',
    'standard': 'Standard 4',
    'subject': 'Environmental Science',
    'topic': 'Ecosystems',
    'chapter': 'Deforestation',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'What is the chemical symbol for helium?',
    'standard': 'Standard 1',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Noble Gases',
    'options': [
        {'text': 'He', 'is_correct': True},
        {'text': 'H', 'is_correct': False},
        {'text': 'Ha', 'is_correct': False},
        {'text': 'Hu', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'The chemical symbol for iron is Fe.',
    'standard': 'Standard 2',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Transition Metals',
    'options': [
        {'text': 'True', 'is_correct': True},
        {'text': 'False', 'is_correct': False},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'medium',
    'marks': 5,
    'question_text': 'Who discovered the electron?',
    'standard': 'Standard 3',
    'subject': 'Physics',
    'topic': 'Atomic Structure',
    'chapter': 'Subatomic Particles',
    'options': [
        {'text': 'J.J. Thomson', 'is_correct': True},
        {'text': 'Ernest Rutherford', 'is_correct': False},
        {'text': 'Niels Bohr', 'is_correct': False},
        {'text': 'Max Planck', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Explain the concept of plate tectonics and its role in shaping the Earth\'s surface.',
    'standard': 'Standard 4',
    'subject': 'Geology',
    'topic': 'Plate Tectonics',
    'chapter': 'Earth\'s Structure',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 2,
    'question_text': 'Which planet is known as the "Red Planet"?',
    'standard': 'Standard 1',
    'subject': 'Astronomy',
    'topic': 'Planetary Science',
    'chapter': 'The Solar System',
    'options': [
        {'text': 'Mars', 'is_correct': True},
        {'text': 'Venus', 'is_correct': False},
        {'text': 'Mercury', 'is_correct': False},
        {'text': 'Jupiter', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'Viruses are considered living organisms.',
    'standard': 'Standard 2',
    'subject': 'Biology',
    'topic': 'Microbiology',
    'chapter': 'Virology',
    'options': [
        {'text': 'True', 'is_correct': False},
        {'text': 'False', 'is_correct': True},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'hard',
    'marks': 5,
    'question_text': 'Which of the following elements is a halogen?',
    'standard': 'Standard 3',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Periodic Table',
    'options': [
        {'text': 'Fluorine', 'is_correct': True},
        {'text': 'Sodium', 'is_correct': False},
        {'text': 'Aluminum', 'is_correct': False},
        {'text': 'Calcium', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Discuss the impact of deforestation on biodiversity and climate change.',
    'standard': 'Standard 4',
    'subject': 'Environmental Science',
    'topic': 'Ecosystems',
    'chapter': 'Deforestation',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'What is the chemical symbol for helium?',
    'standard': 'Standard 1',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Noble Gases',
    'options': [
        {'text': 'He', 'is_correct': True},
        {'text': 'H', 'is_correct': False},
        {'text': 'Ha', 'is_correct': False},
        {'text': 'Hu', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'The chemical symbol for iron is Fe.',
    'standard': 'Standard 2',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Transition Metals',
    'options': [
        {'text': 'True', 'is_correct': True},
        {'text': 'False', 'is_correct': False},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'medium',
    'marks': 5,
    'question_text': 'Who discovered the electron?',
    'standard': 'Standard 3',
    'subject': 'Physics',
    'topic': 'Atomic Structure',
    'chapter': 'Subatomic Particles',
    'options': [
        {'text': 'J.J. Thomson', 'is_correct': True},
        {'text': 'Ernest Rutherford', 'is_correct': False},
        {'text': 'Niels Bohr', 'is_correct': False},
        {'text': 'Max Planck', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Explain the concept of plate tectonics and its role in shaping the Earth\'s surface.',
    'standard': 'Standard 4',
    'subject': 'Geology',
    'topic': 'Plate Tectonics',
    'chapter': 'Earth\'s Structure',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 2,
    'question_text': 'Which planet is known as the "Red Planet"?',
    'standard': 'Standard 1',
    'subject': 'Astronomy',
    'topic': 'Planetary Science',
    'chapter': 'The Solar System',
    'options': [
        {'text': 'Mars', 'is_correct': True},
        {'text': 'Venus', 'is_correct': False},
        {'text': 'Mercury', 'is_correct': False},
        {'text': 'Jupiter', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'Viruses are considered living organisms.',
    'standard': 'Standard 2',
    'subject': 'Biology',
    'topic': 'Microbiology',
    'chapter': 'Virology',
    'options': [
        {'text': 'True', 'is_correct': False},
        {'text': 'False', 'is_correct': True},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'hard',
    'marks': 5,
    'question_text': 'Which of the following elements is a halogen?',
    'standard': 'Standard 3',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Periodic Table',
    'options': [
        {'text': 'Fluorine', 'is_correct': True},
        {'text': 'Sodium', 'is_correct': False},
        {'text': 'Aluminum', 'is_correct': False},
        {'text': 'Calcium', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Discuss the impact of deforestation on biodiversity and climate change.',
    'standard': 'Standard 4',
    'subject': 'Environmental Science',
    'topic': 'Ecosystems',
    'chapter': 'Deforestation',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'What is the chemical symbol for helium?',
    'standard': 'Standard 1',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Noble Gases',
    'options': [
        {'text': 'He', 'is_correct': True},
        {'text': 'H', 'is_correct': False},
        {'text': 'Ha', 'is_correct': False},
        {'text': 'Hu', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'The chemical symbol for iron is Fe.',
    'standard': 'Standard 2',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Transition Metals',
    'options': [
        {'text': 'True', 'is_correct': True},
        {'text': 'False', 'is_correct': False},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'medium',
    'marks': 5,
    'question_text': 'Who discovered the electron?',
    'standard': 'Standard 3',
    'subject': 'Physics',
    'topic': 'Atomic Structure',
    'chapter': 'Subatomic Particles',
    'options': [
        {'text': 'J.J. Thomson', 'is_correct': True},
        {'text': 'Ernest Rutherford', 'is_correct': False},
        {'text': 'Niels Bohr', 'is_correct': False},
        {'text': 'Max Planck', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Explain the concept of plate tectonics and its role in shaping the Earth\'s surface.',
    'standard': 'Standard 4',
    'subject': 'Geology',
    'topic': 'Plate Tectonics',
    'chapter': 'Earth\'s Structure',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 2,
    'question_text': 'Which planet is known as the "Red Planet"?',
    'standard': 'Standard 1',
    'subject': 'Astronomy',
    'topic': 'Planetary Science',
    'chapter': 'The Solar System',
    'options': [
        {'text': 'Mars', 'is_correct': True},
        {'text': 'Venus', 'is_correct': False},
        {'text': 'Mercury', 'is_correct': False},
        {'text': 'Jupiter', 'is_correct': False},
    ]
},
{
    'type': 'tf',
    'difficulty_level': 'medium',
    'marks': 2,
    'question_text': 'Viruses are considered living organisms.',
    'standard': 'Standard 2',
    'subject': 'Biology',
    'topic': 'Microbiology',
    'chapter': 'Virology',
    'options': [
        {'text': 'True', 'is_correct': False},
        {'text': 'False', 'is_correct': True},
    ]
},
{
    'type': 'mcq',
    'difficulty_level': 'hard',
    'marks': 5,
    'question_text': 'Which of the following elements is a halogen?',
    'standard': 'Standard 3',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Periodic Table',
    'options': [
        {'text': 'Fluorine', 'is_correct': True},
        {'text': 'Sodium', 'is_correct': False},
        {'text': 'Aluminum', 'is_correct': False},
        {'text': 'Calcium', 'is_correct': False},
    ]
},
{
    'type': 'descriptive',
    'difficulty_level': 'hard',
    'marks': 10,
    'question_text': 'Discuss the impact of deforestation on biodiversity and climate change.',
    'standard': 'Standard 4',
    'subject': 'Environmental Science',
    'topic': 'Ecosystems',
    'chapter': 'Deforestation',
},
{
    'type': 'mcq',
    'difficulty_level': 'easy',
    'marks': 1,
    'question_text': 'What is the chemical symbol for helium?',
    'standard': 'Standard 1',
    'subject': 'Chemistry',
    'topic': 'Elements',
    'chapter': 'Noble Gases',
    'options': [
        {'text': 'He', 'is_correct': True},
        {'text': 'H', 'is_correct': False},
        {'text': 'Ha', 'is_correct': False},
        {'text': 'Hu', 'is_correct': False},
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
            if question_data['type'] != 'descriptive':
                options_data = question_data['options']
                options = [
                    Option(text=option['text'], is_correct=option['is_correct'], question=question)
                    for option in options_data
                ]
                Option.objects.bulk_create(options)

