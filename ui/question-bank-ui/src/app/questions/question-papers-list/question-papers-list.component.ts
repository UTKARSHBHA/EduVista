import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { QuestionPaperService } from '../../service/question-paper.service';
import { DeleteButtonRendererComponent } from '../delete-question-button/delete-question-button.component';
import { ViewButtonRendererComponent } from '../view-question-button/view-question-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-papers-list',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './question-papers-list.component.html',
  styleUrl: './question-papers-list.component.css',
})
export class QuestionPapersListComponent implements OnInit {
  rowData: any[] = [];
  colDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', width:80 },
    //  { headerName: 'Title', field: 'title', filter: true },
    { headerName: 'Standard', field: 'standard_name', filter: true },
    { headerName: 'Subject', field: 'subject_name', filter: true },
    { headerName: 'Chapter', field: 'chapter_name', filter: true },
    { headerName: 'Topics', field: 'topics_name', filter: true },
    { headerName: 'Total Marks', field: 'total_marks', filter: true },
    { headerName: 'Question Count', field: 'question_count', filter: true },
    { headerName: 'Created', field: 'created_at', filter: true },
    { headerName: 'Updated', field: 'updated_at', filter: true },
    {
      field: 'Delete',
      cellRenderer: DeleteButtonRendererComponent,
      onCellClicked: this.delete.bind(this),
      width:100
    },
    {
      field: 'View',
      cellRenderer: ViewButtonRendererComponent,
      onCellClicked: this.view.bind(this),
      width:100
    },
  ];

  constructor(
    private questionPaperService: QuestionPaperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuestionPapers();
  }

  loadQuestionPapers(): void {
    this.questionPaperService.getQuestionPapers().subscribe((data) => {
      this.rowData = data;
    });
  }
  delete(e: any) {
    this.deleteQuestionPaper(e.data.id);
  }
  deleteQuestionPaper(questionPaperId: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionPaperService.deleteQuestionPaper(questionPaperId).subscribe({
        next: (response) => {
          console.log('Question Paper deleted:', response);
          this.loadQuestionPapers();
        },
        error: (error) => {
          console.error('Error deleting question paper', error);
        },
      });
    }
  }
  view(e: any) {
    console.log('veiw clicked');
    this.router.navigate(['/question-paper-view', e.data.id]);
  }
}
