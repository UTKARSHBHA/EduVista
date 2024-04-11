import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../../services/questions.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-view.component.html',
  styleUrl: './question-view.component.css'
})
export class QuestionViewComponent implements OnInit {
  question: any = [];
 
  constructor(private questionsService: QuestionsService, private router: Router , private route: ActivatedRoute)
{
    
  }
 
  ngOnInit(): void {
     const questionId = this.route.snapshot.paramMap.get('id');
     console.log(questionId);
     if (questionId) {
      this.questionsService.getQuestionById(+questionId).subscribe(question => {
        this.question = question;
      });
   } else {
      // Handle the case where questionId is null, e.g., by setting a default value or logging an error
      console.error('Question ID is null');
   }
    //  this.question$ = this.questionsService.getQuestionById(+questionId);
  }
  // In question-view.component.ts
  deleteQuestion(): void {
    if (this.question && confirm('Are you sure you want to delete this question?')) {
        this.questionsService.deleteQuestion(this.question.id).subscribe({
            next: () => {
                console.log('Question deleted successfully');
                this.router.navigate(['/questions-list']); // Navigate to the question list
            },
            error: (error) => {
                console.error('Error deleting question', error);
            }
        });
    }
}
 }