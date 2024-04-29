import { Component } from '@angular/core';
// import { TopicsService} from '../services/topics.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopicsService } from '../services/topics.service';
import { SubjectsService } from '../services/subjects.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChaptersService } from '../services/chapters.service';


@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule,NgSelectModule],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css'
})
export class TopicsComponent {
  topics: any = [];
  topicForm: FormGroup;
  chapters: any[] = []; // Array to hold the list of subjects


  constructor(private formBuilder: FormBuilder, private topicsService: TopicsService, private chaptersService: ChaptersService) { 
  this.topicForm = this.formBuilder.group({
      name: ['', Validators.required],
      chapter: ['', Validators.required],
   });

  }

 ngOnInit(): void {
  // this.loadTopics();
  this.loadChapters(); 
 }
 loadTopics(): void {
  this.topicsService.getTopics().subscribe(data => {
    this.topics = data;
  });
}
loadChapters(): void {
  this.chaptersService.getChapters().subscribe((data:any) => {
    this.chapters = data;
  });
}
onSubmit(): void {
  if (this.topicForm.valid) {
    this.topicsService.addTopic(this.topicForm.value).subscribe((data:any) => {
      console.log('Topic added:', data);
      this.topics.push(data);
      this.topicForm.reset();
    });
  }
}
deleteTopic(topicId: number): void {
  if (confirm('Are you sure you want to delete this topic?')) {
      this.topicsService.deleteTopic(topicId).subscribe({
          next: response => {
              console.log(response);
              // Reload the topics list to ensure it's up-to-date
              this.loadTopics();
          },
          error: error => {
              console.error(error);
          }
      });
  }
}
}
