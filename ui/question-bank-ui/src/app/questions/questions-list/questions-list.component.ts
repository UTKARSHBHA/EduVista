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
    { field: 'question_text', filter: true },
    { field: 'type' , filter: true },
    { field: 'difficulty_level' , filter: true },
    { field: 'standard_name' , filter: true },
    { field: 'subject_name' , filter: true },
    { field: 'marks' , filter: true },
    { field: 'topic_name' , filter: true },
    { field: 'chapter_name' , filter: true },
    {
      field: 'delete',
      cellRenderer: DeleteButtonRendererComponent,
      onCellClicked: this.delete.bind(this),
    },
    {
        field: 'view',
        cellRenderer: ViewButtonRendererComponent,
      onCellClicked: this.view.bind(this),
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

  view(e: any){
    console.log("veiw clicked");
    this.router.navigate(['/question-view', e.data.id]);

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
