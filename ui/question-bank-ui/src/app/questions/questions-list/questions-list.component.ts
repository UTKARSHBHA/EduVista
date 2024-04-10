import { Component, OnInit } from '@angular/core';
import { AgGridAngular , ICellRendererAngularComp} from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { QuestionsService } from '../../services/questions.service';
import { Router } from '@angular/router';
// import { RouterModule } from '@angular/router';
// import { Router } from 'express';

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.css'
})
export class QuestionsListComponent implements OnInit {

  rowData: any[] = [];
  colDefs: ColDef[] = [
     { field: "question_text" },
     { field: "type" },
     { field: "difficulty_level" },
     { field: "standard_name" },
     { field: "subject_name" },
     { field: "marks" },
     { field: "topic_name" },
     { field: "chapter_name" },
    //  { field: "image" },
    {
      headerName: "Delete",
      cellRenderer: (params:any) => {
        return `<button class="delete-btn" (click)="deleteQuestion(${params.data.id})">Delete</button>`;
      }
    }
  ];
 
  constructor(private questionsService: QuestionsService, private router:Router) { }
 
  ngOnInit(): void {
     this.loadQuestions();
  }
 
  loadQuestions(): void {
     this.questionsService.getQuestions().subscribe(data => {
       this.rowData = data;
     });
  }
//   openAddForm(): void {
//     this.router.navigate(['/questions']); // Redirect to /questions
//  }
routTo(route: string) {
  this.router.navigate(['/'+route]);
  }

  deleteQuestion(questionId: number): void {
    console.log("button clicked");``
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionsService.deleteQuestion(questionId).subscribe({
        next: response => {
          console.log('Question deleted:', response);
          this.loadQuestions(); // Reload the questions list
        },
        error: error => {
          console.error('Error deleting question', error);
        }
      });
    }
 }
 }
