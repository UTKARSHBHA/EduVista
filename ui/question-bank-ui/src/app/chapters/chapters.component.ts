import { Component, Optional } from '@angular/core';
import { ChaptersService } from '../services/chapters.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopicsService } from '../services/topics.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { SubjectsService } from '../services/subjects.service';
import { StandardsComponent } from '../standards/standards.component';

@Component({
  selector: 'app-chapters',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, NgSelectModule],
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.css'
})
export class ChaptersComponent {
  chapters: any = [];
  subjects: any[] = []; // Array to hold the list of topics

  chapterForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
     private chaptersService: ChaptersService,
      private subjectsService: SubjectsService,
      @Optional() public dialogRef: MatDialogRef<StandardsComponent>

    ) { 
  this.chapterForm = this.formBuilder.group({
      name: ['', Validators.required],
      subject: [null, Validators.required] // Assuming each chapter is associated with a topic
    });
    
  }
  
  ngOnInit(): void {
    
    // this.loadChapters();
    this.loadSubjects(); 

 }
 loadChapters(): void {
  this.chaptersService.getChapters().subscribe(data => {
    this.chapters = data;
  });
}

loadSubjects(): void {
  this.subjectsService.getSubjects().subscribe((data:any) => {
    this.subjects = data;
  });
}

onSubmit(): void {
  if (this.chapterForm.valid) {
    this.chaptersService.addChapter(this.chapterForm.value).subscribe((data : any) => {
      console.log('Chapter added:', data);
      this.chapters.push(data);
      this.chapterForm.reset();
      this.dialogRef?.close({ refresh: true})

    });
  }
}

deleteChapter(chapterId: number): void {
  if (confirm('Are you sure you want to delete this chapter?')) {
      this.chaptersService.deleteChapter(chapterId).subscribe({
          next: response => {
              console.log(response);
              // Reload the chapters list to ensure it's up-to-date
              this.loadChapters();
          },
          error: error => {
              console.error(error);
          }
      });
  }
}
}
