# QuestionBank

## Table of Contents

- [QuestionBank](#questionbank)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
    - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)

## Introduction

QuestionBank is a comprehensive educational platform designed to manage and organize educational questions. It leverages Django for the backend and Angular for the frontend, providing a powerful API for managing questions, subjects, standards, topics, chapters, and more. The application supports multiple question types, including multiple-choice, true or false, and descriptive questions.

## Features

- **Subject Management**: Create and manage subjects.
- **Standard Management**: Organize questions by educational standards.
- **Topic and Chapter Management**: Categorize questions into topics and chapters for better organization.
- **Question Management**: Add, edit, and categorize questions with different types and difficulty levels.
- **Option Management**: Manage options for multiple-choice questions.
- **Image Support**: Attach images to questions for better clarity.
- **RESTful API**: Provides a RESTful API for managing all aspects of the application.
- **Frontend Interface**: A user-friendly interface built with Angular for managing questions and other resources.

## Prerequisites

- Python 3.8 or higher
- Django 5.0 or higher
- Django REST Framework
- PostgreSQL
- Node.js and npm (for Angular frontend)

## Setup

### Backend Setup

1. Install Django and Django REST Framework:
bash pip install django djangorestframework


2. Create a new Django project:
bash django-admin startproject QuestionBank


3. Navigate to the project directory:
bash cd QuestionBank


4. Create a new Django app:
bash python manage.py startapp Questions


5. Install the required packages:
bash pip install -r requirements.txt


6. Apply migrations:
bash python manage.py makemigrations python manage.py migrate


7. Run the development server:
bash python manage.py runserver


### Frontend Setup

1. Navigate to the frontend directory:
bash cd ui/question-bank-ui


2. Install Angular CLI globally (if not already installed):
bash npm install -g @angular/cli


3. Install project dependencies:
bash npm install


4. Run the Angular development server:
bash ng serve


5. Navigate to `http://localhost:4200/` in your browser to view the application.

### Database Setup

1. Install PostgreSQL on your system.

2. Create a new PostgreSQL database and user:
sql CREATE DATABASE questionbank; CREATE USER questionbankuser WITH PASSWORD 'yourpassword'; GRANT ALL PRIVILEGES ON DATABASE questionbank TO questionbankuser;


3. Update the `DATABASES` setting in your Django project's `settings.py` file to use the PostgreSQL database:
python DATABASES = { 'default': { 'ENGINE': 'django.db.backends.postgresql', 'NAME': 'questionbank', 'USER': 'questionbankuser', 'PASSWORD': 'yourpassword', 'HOST': 'localhost', 'PORT': '5432', } }


4. Install the PostgreSQL client for Python:
bash pip install psycopg2


5. Run migrations to create the necessary tables in your PostgreSQL database:
bash python manage.py migrate


## Running the Application

To run the application, you need to start both the backend and frontend servers. Follow the instructions in the [Setup](#setup) section to start each server.
