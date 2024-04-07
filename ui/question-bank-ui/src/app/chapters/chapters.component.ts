import { Component } from '@angular/core';
import { ChaptersService } from '../services/chapters.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopicsService } from '../services/topics.service';

@Component({
  selector: 'app-chapters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.css'
})
export class ChaptersComponent {
  chapters: any = [];
  topics: any[] = []; // Array to hold the list of topics

  chapterForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private chaptersService: ChaptersService, private topicsService: TopicsService) { 
  this.chapterForm = this.formBuilder.group({
      name: ['', Validators.required],
      topic: ['', Validators.required] // Assuming each chapter is associated with a topic
    });
    
  }
  
  ngOnInit(): void {
    
    this.loadChapters();
    this.loadTopics(); // Load topics when the component initializes

 }
 loadChapters(): void {
  this.chaptersService.getChapters().subscribe(data => {
    this.chapters = data;
  });
}

loadTopics(): void {
  this.topicsService.getTopics().subscribe((data:any) => {
    this.topics = data;
  });
}

onSubmit(): void {
  if (this.chapterForm.valid) {
    this.chaptersService.addChapter(this.chapterForm.value).subscribe((data : any) => {
      console.log('Chapter added:', data);
      this.chapters.push(data);
      this.chapterForm.reset();
    });
  }
}
}
