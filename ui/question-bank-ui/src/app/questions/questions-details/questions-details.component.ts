import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { CommonModule } from '@angular/common';
import { OptionsService } from '../../services/options.service';

@Component({
  selector: 'app-questions-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questions-details.component.html',
  styleUrl: './questions-details.component.css'
})
export class QuestionDetailsComponent implements OnInit {
  questions: any[] = [];
 
  constructor(private questionsService: QuestionsService, private optionsService: OptionsService) { }
 
  ngOnInit(): void {
     this.loadQuestions();
  }
 
  loadQuestions(): void {
     this.questionsService.getQuestions().subscribe(data => {
       this.questions = data;
       this.questions.forEach(question => {
         this.optionsService.getOptionsByQuestionId(question.id).subscribe((options:any) => {
           question.options = options;
         });
       });
     });
  }


  deleteQuestion(questionId: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionsService.deleteQuestion(questionId).subscribe({
        next: response => {
          console.log('Question deleted:', response);
          // Remove the deleted question from the local array
          this.loadQuestions();
        },
        error: error => {
          console.error('Error deleting question', error);
        }
      });
    }
   }

 }