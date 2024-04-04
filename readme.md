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
  - [Running the Application](#running-the-application)
  - [Contributing](#contributing)

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
- SQLite (default database)
- Node.js and npm (for Angular frontend)

## Setup

### Backend Setup

1. Install Django and Django REST Framework:
pip install django djangorestframework


2. Create a new Django project:
django-admin startproject QuestionBank


3. Navigate to the project directory:
cd QuestionBank


4. Create a new Django app:
python manage.py startapp bank


5. Install the required packages:
pip install -r requirements.txt


6. Apply migrations:
python manage.py migrate


7. Run the development server:
python manage.py runserver


### Frontend Setup

1. Navigate to the frontend directory:
cd ui/question-bank-ui


2. Install Angular CLI globally (if not already installed):
npm install -g @angular/cli


3. Install project dependencies:
npm install


4. Run the Angular development server:
ng serve


5. Navigate to `http://localhost:4200/` in your browser to view the application.

## Running the Application

To run the application, you need to start both the backend and frontend servers. Follow the instructions in the [Setup](#setup) section to start each server.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) before getting started.

