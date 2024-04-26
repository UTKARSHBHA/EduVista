import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { QuestionsService } from '../services/questions.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StandardsService } from '../services/standards.service';
import { SubjectsService } from '../services/subjects.service';
import { TopicsService } from '../services/topics.service';
import { ChaptersService } from '../services/chapters.service';
import { QuestionPaperService } from '../service/question-paper.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-question-paper-generator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule, FormsModule],
  templateUrl: './question-paper-generator.component.html',
  styleUrl: './question-paper-generator.component.css',
})
export class QuestionPaperGeneratorComponent {
  questionPaperForm: FormGroup;
  standards: any[] = [];
  subjects: any[] = [];
  topics: any[] = [];
  chapters: any[] = [];
  selectedTopics: any[] = [];
  selectedChapters: any[] = [];
  selectedCar: number = 0;

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

  // Inside your component class
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private standardsService: StandardsService,
    private subjectsService: SubjectsService,
    private topicsService: TopicsService,
    private chaptersService: ChaptersService,
    private questionPaperService: QuestionPaperService
  ) {
    this.questionPaperForm = this.formBuilder.group({
      standard: ['', Validators.required],
      subject: ['', Validators.required],
      chapters: [[]],
      topics: [[]],
      total_marks: [0, [Validators.required, Validators.min(0)]],
      mcq: [false],
      tf: [false],
      descriptive: [false],
    });
  }

  ngOnInit(): void {
    this.loadStandards();
    this.loadSubjects();
  }

  loadStandards(): void {
    this.standardsService.getStandards().subscribe((data: any) => {
      this.standards = data;
    });
  }
  loadSubjects(): void {
    this.subjectsService.getSubjects().subscribe((data: any) => {
      this.subjects = data;
    });
  }

  onSubjectSelected(e: any): void {
    const chapterId = e.target.value;
    // this.selectedSubject = chapterId;
    this.chaptersService.getChaptersBySubject(chapterId).subscribe((data) => {
      this.chapters = data;
      console.log(this.chapters);
      this.topics = [];
      this.selectedChapters = [];
    });
  }

  onChapterSelected(event: []): void {
    this.selectedChapters = [];
    if(event?.length>0){
      event.forEach((chapter:any) =>{
        this.selectedChapters.push(chapter.id);
      })
    }else{
      this.selectedChapters = [];
    }
   alert(this.selectedChapters);
    this.questionPaperForm.get('chapters')?.setValue(this.selectedChapters);
    this.topics = []; // Reset chapters based on the new subject

    console.log(this.questionPaperForm.value);
    if (this.selectedChapters.length) {
      this.topicsService
        .getTopicsByChapters(this.selectedChapters)
        .subscribe((data) => {
          this.topics = data;
          console.log(this.topics);
        });
    }
  }

  onTopicSelected(event: any, topicId: number): void {
    if (event.target.checked) {
      this.selectedTopics.push(topicId);
    } else {
      const index = this.selectedTopics.indexOf(topicId);
      if (index > -1) {
        this.selectedTopics.splice(index, 1);
      }
    }

    console.log('topics', this.selectedTopics);
    this.questionPaperForm.get('topics')?.setValue(this.selectedTopics);

    console.log(this.questionPaperForm.value);
  }

  generateQuestionPaper(): void {
    if (this.questionPaperForm.valid) {

      const formValue = this.questionPaperForm.value;
      console.log(formValue);
      this.questionPaperService.generateQuestionPaper(formValue).subscribe(
        (response) => {
          this.errorMessage = "";
          console.log(response); // Handle the response from the backend
        },
        (error) => {
          console.error('Error:', error);
          this.errorMessage = error.error.error;
          
        }
      );
      
    }
    else{
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
  
}
