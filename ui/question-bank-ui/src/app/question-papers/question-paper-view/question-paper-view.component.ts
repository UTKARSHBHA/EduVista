import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionPaperService } from '../../service/question-paper.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-paper-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-paper-view.component.html',
  styleUrl: './question-paper-view.component.css'
})
export class QuestionPaperViewComponent implements OnInit {
  @Input() questionPaper: any = [];
  @Input() showSaveButton: boolean = false;
  @Output() saveRequested = new EventEmitter<void>();
 
  constructor(
     private route: ActivatedRoute,
     private questionPaperService: QuestionPaperService
  ) {}
 
  ngOnInit(): void {
     const questionPaperId = this.route.snapshot.paramMap.get('id');
     if (questionPaperId) {
       this.questionPaperService.getQuestionPaperById(questionPaperId).subscribe(
         (response) => {
           // Parse the question_paper_json string into a JavaScript object
           this.questionPaper = JSON.parse(response.question_paper_json);
         },
         (error) => {
           console.error('Error fetching question paper', error);
         }
       );
     }
  }

  printQuestionPaper(): void {
    window.print();
  }
  saveQuestionPaper(): void {
    this.saveRequested.emit(); // Emit the event when the save button is clicked
 }
 getDifferentQuestion(index: number): void {
  // Get the question to replace
  const questionToReplace = this.questionPaper[index];

  // Get the list of all questions in the question paper
  const existingQuestions = [...this.questionPaper];

  // Call the service method to get a new question
  this.questionPaperService.getNewQuestion(questionToReplace, existingQuestions).subscribe(newQuestion => {
    // Replace the question at the given index with the new question
    console.log("new question", newQuestion);
    this.questionPaper[index] = newQuestion;
  });
}
  
 }