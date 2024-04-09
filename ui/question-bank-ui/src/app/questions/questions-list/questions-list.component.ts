import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
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
 }
