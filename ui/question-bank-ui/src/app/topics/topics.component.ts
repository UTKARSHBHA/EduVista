import { Component, Optional } from '@angular/core';
// import { TopicsService} from '../services/topics.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TopicsService } from '../services/topics.service';
import { SubjectsService } from '../services/subjects.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChaptersService } from '../services/chapters.service';
import { StandardsComponent } from '../standards/standards.component';
import { ChaptersComponent } from '../chapters/chapters.component';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, NgSelectModule],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent {
  topics: any = [];
  topicForm: FormGroup;
  chapters: any[] = []; // Array to hold the list of subjects
  ChapterModal: MatDialogRef<ChaptersComponent>|undefined;

  constructor(
    private formBuilder: FormBuilder,
    private topicsService: TopicsService,
    private chaptersService: ChaptersService,
    private matDialog: MatDialog,

    @Optional() public dialogRef: MatDialogRef<StandardsComponent>
  ) {
    this.topicForm = this.formBuilder.group({
      name: ['', Validators.required],
      chapter: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // this.loadTopics();
    this.loadChapters();
  }
  loadTopics(): void {
    this.topicsService.getTopics().subscribe((data) => {
      this.topics = data;
    });
  }
  loadChapters(): void {
    this.chaptersService.getChapters().subscribe((data: any) => {
      this.chapters = data;
    });
  }
  onSubmit(): void {
    if (this.topicForm.valid) {
      this.topicsService
        .addTopic(this.topicForm.value)
        .subscribe((data: any) => {
          console.log('Topic added:', data);
          this.topics.push(data);
          this.topicForm.reset();
          this.dialogRef?.close({ refresh: true})

        });
    }
  }
  deleteTopic(topicId: number): void {
    if (confirm('Are you sure you want to delete this topic?')) {
      this.topicsService.deleteTopic(topicId).subscribe({
        next: (response) => {
          console.log(response);
          // Reload the topics list to ensure it's up-to-date
          this.loadTopics();
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  openChapterModal() {
    this.ChapterModal = this.matDialog.open(ChaptersComponent, {
      disableClose: true,
      height: '90vh',
      width: '90vw',
    });
    this.ChapterModal.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      if(result && result.refresh){
        this.loadChapters();
      }
    });
    
  }
}
