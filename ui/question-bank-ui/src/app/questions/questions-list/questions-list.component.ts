import { Component, OnInit } from '@angular/core';
import {
  AgGridAngular,
  AgGridModule,
  ICellRendererAngularComp,
} from 'ag-grid-angular';
import { ColDef, FrameworkComponentWrapper } from 'ag-grid-community';
import { QuestionsService } from '../../services/questions.service';
import { Router } from '@angular/router';
import { DeleteButtonRendererComponent } from '../../delete-button/delete-button.component';
import { ViewButtonRendererComponent } from '../../view-button/view-button.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PermissionsService } from '../../services/permissions.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StandardsComponent } from '../../standards/standards.component';
import { SubjectsComponent } from '../../subjects/subjects.component';
import { ChaptersComponent } from '../../chapters/chapters.component';
import { TopicsComponent } from '../../topics/topics.component';
import { QuestionsComponent } from '../questions.component';
import { UpdateButtonRendererComponent } from '../../update-button/update-button.component';

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [AgGridAngular, MatPaginatorModule, CommonModule],
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.css',
})
export class QuestionsListComponent implements OnInit {
  rowData: any[] = [];
  colDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', maxWidth: 50, filter: true },
    { headerName: 'Created By', field: 'user', maxWidth: 200, filter: true },
    {
      headerName: 'Question',
      field: 'question_text',
      filter: true,
      maxWidth: 400,
      tooltipField: "question_text",

    },
    { headerName: 'Type', field: 'type', filter: true, maxWidth: 200 },
    {
      headerName: 'Difficulty',
      field: 'difficulty_level',
      filter: true,
      maxWidth: 200,
    },
    {
      headerName: 'Standard',
      field: 'standard_name',
      filter: true,
      maxWidth: 200,
    },
    {
      headerName: 'Subject',
      field: 'subject_name',
      filter: true,
      maxWidth: 200,
    },
    { headerName: 'Marks', field: 'marks', filter: true, maxWidth: 100 },
    {
      headerName: 'Topics',
      field: 'topics_name',

      filter: true,
      maxWidth: 200,
    },
    // { field: 'topic_name' , filter: true },
    // { field: 'topics' , filter: true },
    {
      headerName: 'Chapter',
      field: 'chapter_name',
      filter: true,
      maxWidth: 200,
      tooltipField: "chapter_name",

    },
    {
      field: 'Delete',
      cellRenderer: DeleteButtonRendererComponent,
      onCellClicked: this.delete.bind(this),
      maxWidth: 100,
      hide: !this.permissionsService.getPermissions(
        'Questions.delete_question'
      ),
    },
    {
      field: 'View',
      cellRenderer: ViewButtonRendererComponent,
      onCellClicked: this.view.bind(this),
      maxWidth: 100,
      hide: !this.permissionsService.getPermissions('Questions.view_question'),
    },
    {
      field: 'Update',
      cellRenderer: UpdateButtonRendererComponent,
      onCellClicked: this.update.bind(this),
      maxWidth: 100,
      hide: !this.permissionsService.getPermissions(
        'Questions.change_question'
      ),
    },
  ];

  pageSize = 10;
  totalQuestions = 0;
  currentPage = 1;
  StandardModal: MatDialogRef<StandardsComponent> | undefined;
  SubjectModal: MatDialogRef<SubjectsComponent> | undefined;
  ChapterModal: MatDialogRef<ChaptersComponent> | undefined;
  TopicModal: MatDialogRef<TopicsComponent> | undefined;
  QuestionModal: MatDialogRef<QuestionsComponent> | undefined;

  autoSizeStrategy: any;

  constructor(
    private questionsService: QuestionsService,
    private router: Router,
    public permissionsService: PermissionsService,
    private matDialog: MatDialog
  ) {
    this.autoSizeStrategy = {
      type: 'fitCellContents',
    };
  }

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
  update(e: any) {
    console.log('update clicked');
    this.openQuestionModal(e.data.id);
    // this.router.navigate(['/question-view', e.data.id]);
  }

  deleteQuestion(questionId: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionsService.deleteQuestion(questionId).subscribe({
        next: (response) => {
          console.log('Question deleted:', response);
          this.loadQuestions(this.currentPage + 1);
        },
        error: (error) => {
          console.error('Error deleting question', error);
        },
      });
    }
  }

  openStandardModal() {
    this.StandardModal = this.matDialog.open(StandardsComponent, {
      height: '90vh',
      width: '90vw',
      disableClose: true,
    });
  }

  openSubjectModal() {
    this.SubjectModal = this.matDialog.open(SubjectsComponent, {
      height: '90vh',
      width: '90vw',
      disableClose: true,
    });
  }
  openChapterModal() {
    this.ChapterModal = this.matDialog.open(ChaptersComponent, {
      height: '90vh',
      width: '90vw',
      disableClose: true,
    });
  }
  openTopicModal() {
    this.TopicModal = this.matDialog.open(TopicsComponent, {
      height: '90vh',
      width: '90vw',
      disableClose: true,
    });
  }
  openQuestionModal(id: any) {
    this.QuestionModal = this.matDialog.open(QuestionsComponent, {
      height: '90vh',
      width: '90vw',
      disableClose: true,
      data: { id },
    });
  }
}
