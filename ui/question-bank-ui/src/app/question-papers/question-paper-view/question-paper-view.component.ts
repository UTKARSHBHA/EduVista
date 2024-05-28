import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionPaperService } from '../../services/question-paper.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagsService } from '../../services/tags.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-question-paper-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './question-paper-view.component.html',
  styleUrl: './question-paper-view.component.css',
})
export class QuestionPaperViewComponent implements OnInit {
  @Input() questionPaper: any = [];
  @Input() showSaveButton: boolean = false;
  @Input() questionPaperID: string | null = null; // Add this line

  @Output() saveRequested = new EventEmitter<void>();



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private questionPaperService: QuestionPaperService,
    private tagsService: TagsService,
  ) {

  }

  ngOnInit(): void {
    this.questionPaperID = this.route.snapshot.paramMap.get('id');
    if (this.questionPaperID) {
      this.questionPaperService
        .getQuestionPaperById(this.questionPaperID)
        .subscribe(
          (response) => {
            // Parse the question_paper_json string into a JavaScript object
            this.questionPaper = JSON.parse(response.question_paper_json);
            console.log(this.questionPaper);

            //hardcode tags
            for(let question of this.questionPaper){
              // question.tags = [
              //   {
              //     id: 1,
              //     name: "2020"
              //   },
              //   {
              //     id: 2,
              //     name: "2021"
              //   }
              // ]
              question.selectedTags = [];
            }

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
    const selectedTags = questionToReplace.selectedTags;


    // Get the list of all questions in the question paper
    const existingQuestions = [...this.questionPaper];

    console.log('selected tags', selectedTags);
    // Call the service method to get a new question
    this.questionPaperService
      .getNewQuestion(questionToReplace,selectedTags, existingQuestions)
      .subscribe((newQuestion) => {
        // Replace the question at the given index with the new question
        console.log('new question', newQuestion);
        this.questionPaper[index] = newQuestion;
      });
  }
}
