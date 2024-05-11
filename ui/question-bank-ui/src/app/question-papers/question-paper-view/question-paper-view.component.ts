import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionPaperService } from '../../service/question-paper.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-paper-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-paper-view.component.html',
  styleUrl: './question-paper-view.component.css',
})
export class QuestionPaperViewComponent implements OnInit {
  @Input() questionPaper: any = [];
  @Input() showSaveButton: boolean = false;
  @Input() questionPaperID: string | null = null; // Add this line

  @Output() saveRequested = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private questionPaperService: QuestionPaperService
  ) {}

  ngOnInit(): void {
    this.questionPaperID = this.route.snapshot.paramMap.get('id');
    if (this.questionPaperID) {
      this.questionPaperService
        .getQuestionPaperById(this.questionPaperID)
        .subscribe(
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
    if (this.questionPaperID) {
      this.questionPaperService
        .getQuestionPaperById(this.questionPaperID)
        .subscribe(
          (response) => {
            // Parse the question_paper_json string into a JavaScript object
            let questionPaperData = response;
            questionPaperData.question_paper_json = JSON.stringify(this.questionPaper);
            console.log('save clicked in view', this.questionPaperID);
            this.questionPaperService
              .updateQuestionPaper(this.questionPaperID, questionPaperData)
              .subscribe(
                (response) => {
                  console.log('Question paper updated successfully');
                  alert('Question paper updated successfully in the database');
                  this.questionPaper = JSON.parse(response.question_paper_json);
                },
                (error) => {
                  console.error('Error updating question paper', error);
                }
              );
          },
          (error) => {
            console.error('Error fetching question paper', error);
          }
        );

     
    }
    this.saveRequested.emit(); // Emit the event when the save button is clicked
  }
  getDifferentQuestion(index: number): void {
    // Get the question to replace
    const questionToReplace = this.questionPaper[index];

    // Get the list of all questions in the question paper
    const existingQuestions = [...this.questionPaper];

    // Call the service method to get a new question
    this.questionPaperService
      .getNewQuestion(questionToReplace, existingQuestions)
      .subscribe((newQuestion) => {
        // Replace the question at the given index with the new question
        console.log('new question', newQuestion);
        this.questionPaper[index] = newQuestion;
      });
  }
}
