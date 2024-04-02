# QuestionBank

## Table of Contents

- [QuestionBank](#questionbank)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
    - [Project Creation](#project-creation)
    - [Installation](#installation)


## Introduction

QuestionBank is a Django-based web application designed to manage and organize educational questions. It leverages Django REST Framework to provide a powerful API for managing questions, subjects, standards, topics, chapters, and more. The application supports multiple question types, including multiple-choice, true or false, and descriptive questions.

## Features

- **Subject Management**: Create and manage subjects.
- **Standard Management**: Organize questions by educational standards.
- **Topic and Chapter Management**: Categorize questions into topics and chapters for better organization.
- **Question Management**: Add, edit, and categorize questions with different types and difficulty levels.
- **Option Management**: Manage options for multiple-choice questions.
- **Image Support**: Attach images to questions for better clarity.
- **RESTful API**: Provides a RESTful API for managing all aspects of the application.

## Prerequisites

- Python 3.8 or higher
- Django 5.0 or higher
- Django REST Framework
- SQLite (default database)

## Setup

### Project Creation

1. Install Django and Django REST Framework:
pip install django djangorestframework


2. Create a new Django project:
django-admin startproject QuestionBank


3. Navigate to the project directory:
cd QuestionBank


4. Create a new Django app:
python manage.py startapp bank


### Installation

1. Install the required packages:
pip install -r requirements.txt


2. Apply migrations:
python manage.py migrate


3. Run the development server:
python manage.py runserver


