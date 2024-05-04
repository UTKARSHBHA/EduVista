import { Component, OnInit } from '@angular/core';
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
  questionPaper: any[] = [];
 
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
 }