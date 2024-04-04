import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  standalone: true,
  imports: [CommonModule] 
})
export class QuestionListComponent implements OnInit {
 questions: any[] = [];

 constructor(private questionService: QuestionService) { }

 ngOnInit(): void {
    console.log('Component initialized'); // Log initialization
    this.questionService.fetchQuestions().then(data => {
      this.questions = data;
      console.log('Questions set:', this.questions); // Log the questions array
    }).catch(error => {
      console.error('Failed to fetch questions:', error);
    });
 }
}
