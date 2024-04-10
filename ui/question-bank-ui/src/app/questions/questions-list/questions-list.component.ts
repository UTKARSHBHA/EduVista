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

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.css',
})
export class QuestionsListComponent implements OnInit {
  rowData: any[] = [];
  colDefs: ColDef[] = [
    { field: 'id' },
    { field: 'question_text' },
    { field: 'type' },
    { field: 'difficulty_level' },
    { field: 'standard_name' },
    { field: 'subject_name' },
    { field: 'marks' },
    { field: 'topic_name' },
    { field: 'chapter_name' },
    {
      field: 'button',
      cellRenderer: DeleteButtonRendererComponent,
      onCellClicked: this.delete.bind(this),
    },
  ];

  constructor(
    private questionsService: QuestionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionsService.getQuestions().subscribe((data) => {
      this.rowData = data;
    });
  }

  routTo(route: string) {
    this.router.navigate(['/' + route]);
  }

  delete(e: any) {
    this.deleteQuestion(e.data.id);
  }

  deleteQuestion(questionId: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionsService.deleteQuestion(questionId).subscribe({
        next: (response) => {
          console.log('Question deleted:', response);
          this.loadQuestions();
        },
        error: (error) => {
          console.error('Error deleting question', error);
        },
      });
    }
  }

}
