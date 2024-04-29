import { Component, OnInit } from '@angular/core';
import {
  AgGridAngular,
  AgGridModule,
  ICellRendererAngularComp,
} from 'ag-grid-angular';
import { ColDef, FrameworkComponentWrapper } from 'ag-grid-community';
import { QuestionsService } from '../../services/questions.service';
import { Router } from '@angular/router';
import { DeleteButtonRendererComponent } from '../delete-question-button/delete-question-button.component';
import { ViewButtonRendererComponent } from '../view-question-button/view-question-button.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [AgGridAngular, MatPaginatorModule],
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.css',
})
export class QuestionsListComponent implements OnInit {
  rowData: any[] = [];
  colDefs: ColDef[] = [
    // { headerName: 'ID',field: 'id' },
    { headerName: 'Question', field: 'question_text', filter: true },
    { headerName: 'Type', field: 'type', filter: true },
    { headerName: 'Difficulty', field: 'difficulty_level', filter: true },
    { headerName: 'Standard', field: 'standard_name', filter: true },
    { headerName: 'Subject', field: 'subject_name', filter: true },
    { headerName: 'Marks', field: 'marks', filter: true },
    {
      headerName: 'Topics',
      field: 'topics_name',

      filter: true,
    },
    // { field: 'topic_name' , filter: true },
    // { field: 'topics' , filter: true },
    { headerName: 'Chapter', field: 'chapter_name', filter: true },
    {
      field: 'Delete',
      cellRenderer: DeleteButtonRendererComponent,
      onCellClicked: this.delete.bind(this),
    },
    {
      field: 'View',
      cellRenderer: ViewButtonRendererComponent,
      onCellClicked: this.view.bind(this),
    },
  ];

  pageSize = 10;
  totalQuestions = 0;
  currentPage = 0;

  constructor(
    private questionsService: QuestionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(page: number = 1): void {
    this.questionsService
      .getQuestions(page, this.pageSize)
      .subscribe((data) => {
        console.log(data);
        this.rowData = data.results;
        this.totalQuestions = data.count;
      });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadQuestions(this.currentPage + 1); // Pagination is 1-indexed
  }

  routTo(route: string) {
    this.router.navigate(['/' + route]);
  }

  delete(e: any) {
    this.deleteQuestion(e.data.id);
  }

  view(e: any) {
    console.log('veiw clicked');
    this.router.navigate(['/question-view', e.data.id]);
  }

  deleteQuestion(questionId: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionsService.deleteQuestion(questionId).subscribe({
        next: (response) => {
          console.log('Question deleted:', response);
          this.loadQuestions(this.currentPage);
        },
        error: (error) => {
          console.error('Error deleting question', error);
        },
      });
    }
  }
}
