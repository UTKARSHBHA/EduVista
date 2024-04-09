import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChaptersService } from '../services/chapters.service';
import { TopicsService } from '../services/topics.service';
import { SubjectsService } from '../services/subjects.service';
import { StandardsService } from '../services/standards.service';
import { CommonModule } from '@angular/common';
import { QuestionDetailsComponent } from './questions-details/questions-details.component';
@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule ,QuestionDetailsComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnInit {
  questionForm: FormGroup;
  questions: any[] = [];
  chapters: any[] = [];
  topics: any[] = [];
  subjects: any[] = [];
  standards: any[] = []; 

 
  constructor(private formBuilder: FormBuilder, private questionsService: QuestionsService, private chaptersService: ChaptersService, private topicsService: TopicsService, private subjectsService: SubjectsService, private standardsService: StandardsService) { 

    this.questionForm = this.formBuilder.group({
      question_text: ['', Validators.required],
      type: ['', Validators.required],
      difficulty_level: ['', Validators.required],
      standard: ['', Validators.required], 
      subject: ['', Validators.required],
      marks: ['', Validators.required],
      topic: ['', Validators.required],
      chapter: ['', Validators.required],
      image: [null] 
     });
  }
 
  ngOnInit(): void {
 
     this.loadQuestions();
     this.loadChapters();
     this.loadTopics();
     this.loadSubjects();
     this.loadStandards(); 

  }
  loadStandards(): void {
    this.standardsService.getStandards().subscribe((data:any) => {
      this.standards = data;
    });
 }
  loadQuestions(): void {
     this.questionsService.getQuestions().subscribe(data => {
       this.questions = data;
     });
  }
 
  loadChapters(): void {
     this.chaptersService.getChapters().subscribe((data:any) => {
       this.chapters = data;
     });
  }
 
  loadTopics(): void {
     this.topicsService.getTopics().subscribe((data:any) => {
       this.topics = data;
     });
  }
 
  loadSubjects(): void {
     this.subjectsService.getSubjects().subscribe((data:any) => {
       this.subjects = data;
     });
  }
 
  


  selectedFile: File | null = null;

onFileSelected(event: any): void {
 if (event.target.files && event.target.files.length > 0) {
    this.selectedFile = event.target.files[0];
 } else {
    this.selectedFile = null;
 }
}


deleteQuestion(questionId: number): void {
  if (confirm('Are you sure you want to delete this question?')) {
      this.questionsService.deleteQuestion(questionId).subscribe({
          next: response => {
              console.log(response);
              this.loadQuestions();
          },
          error: error => {
              console.error(error);
          }
      });
  }
}
@ViewChild('fileInput') fileInput!: ElementRef;


onSubmit(): void {
  if (this.questionForm.valid) {
     const formData = new FormData();
     Object.keys(this.questionForm.value).forEach(key => {
       if (key !== 'image') { 
         formData.append(key, this.questionForm.value[key]);
       }
     });
 
     if (this.selectedFile) {
       formData.append('image', this.selectedFile, this.selectedFile.name);
     }

     this.questionsService.addQuestion(formData).subscribe({
      next: data => {
        console.log('Question added:', data);
        this.questions.push(data);
        this.questionForm.reset();
        this.selectedFile = null;
        this.fileInput.nativeElement.value = '';
      },
      error: error => {
        console.error('Error adding question', error);
      }
    });
  }
 }

 }