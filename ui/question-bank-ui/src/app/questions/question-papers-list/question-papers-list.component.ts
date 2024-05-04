import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { QuestionPaperService } from '../../service/question-paper.service'; 

@Component({
  selector: 'app-question-papers-list',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './question-papers-list.component.html',
  styleUrl: './question-papers-list.component.css'
})
export class QuestionPapersListComponent implements OnInit {
  rowData: any[] = [];
  colDefs: ColDef[] = [
     { headerName: 'ID', field: 'id' },
    //  { headerName: 'Title', field: 'title', filter: true },
     { headerName: 'Standard', field: 'standard_name', filter: true },
     { headerName: 'Subject', field: 'subject_name', filter: true },
     { headerName: 'Chapter', field: 'chapter_name', filter: true },
     { headerName: 'Topics', field: 'topics_name', filter: true },
     { headerName: 'Total Marks', field: 'total_marks', filter: true },
     { headerName: 'Question Count', field: 'question_count', filter: true },
  ];
 
  constructor(private questionPaperService: QuestionPaperService) {}
 
  ngOnInit(): void {
     this.loadQuestionPapers();
  }
 
  loadQuestionPapers(): void {
     this.questionPaperService.getQuestionPapers().subscribe((data) => {
       this.rowData = data;
     });
  }
 }