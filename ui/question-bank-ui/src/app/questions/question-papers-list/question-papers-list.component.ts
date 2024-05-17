import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { QuestionPaperService } from '../../services/question-paper.service';
import { DeleteButtonRendererComponent } from '../../delete-question-button/delete-button.component'; 
import { ViewButtonRendererComponent } from '../../view-button/view-button.component';
import { Router } from '@angular/router';
import { PermissionsService } from '../../services/permissions.service';

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
    { headerName: 'ID', field: 'id', maxWidth:200,filter: true },
    //  { headerName: 'Title', field: 'title', filter: true },
    { headerName: 'Created By',field: 'user', maxWidth: 200,filter: true },

    { headerName: 'Standard', field: 'standard_name', maxWidth: 200, filter: true },
    { headerName: 'Subject', field: 'subject_name', filter: true , maxWidth: 200,},
    { headerName: 'Chapter', field: 'chapter_name', filter: true , maxWidth: 200,},
    { headerName: 'Topics', field: 'topics_name', filter: true , maxWidth: 200,},
    { headerName: 'Total Marks', field: 'total_marks', maxWidth: 200, filter: true },
    { headerName: 'Question Count', field: 'question_count', filter: true, maxWidth: 200, },
    { headerName: 'Created', field: 'created_at', filter: true , maxWidth: 200,},
    { headerName: 'Updated', field: 'updated_at', filter: true, maxWidth: 200, },
    {
      field: 'Delete',
      cellRenderer: DeleteButtonRendererComponent,
      onCellClicked: this.delete.bind(this),
      maxWidth:200,
      hide: !this.permissionsService.getPermissions('Questions.delete_questionpaper'),

    },
    {
      field: 'View',
      cellRenderer: ViewButtonRendererComponent,
      onCellClicked: this.view.bind(this),
      maxWidth:200,
      hide: !this.permissionsService.getPermissions('Questions.delete_questionpaper'),

    },
  ];
  autoSizeStrategy: any;

  constructor(
    private questionPaperService: QuestionPaperService,
    private router: Router,
    public permissionsService: PermissionsService

  ) {
    this.autoSizeStrategy = {
      type: 'fitCellContents',
  };
  }

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
