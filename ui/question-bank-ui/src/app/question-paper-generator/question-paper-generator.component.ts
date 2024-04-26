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
      questionsGrid: this.formBuilder.array([this.createQuestionRow()])

    });
 }

 ngOnInit(): void {
    this.loadStandards();
    this.loadSubjects();
 }

 createQuestionRow(): FormGroup {
  return this.formBuilder.group({
    type: ['', Validators.required],
    marks: [0, [Validators.required, Validators.min(0)]],
    count: [0, [Validators.required, Validators.min(0)]]
  });
}
get questionsGrid(): FormArray {
  return this.questionPaperForm.get('questionsGrid') as FormArray;
}
addQuestionRow(): void {
  this.questionsGrid.push(this.createQuestionRow());
}

// Method to remove a row from the grid
removeQuestionRow(index: number): void {
  this.questionsGrid.removeAt(index);
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

 onSubjectSelected(event: any): void {

  const subjectId = event.id;
  this.chaptersService.getChaptersBySubject(subjectId).subscribe((data) => {
    this.chapters = data;
    this.topics = []; // Reset topics when subject changes
    this.questionPaperForm.get("topics")?.reset()
    this.questionPaperForm.get("chapters")?.reset()

  });
}

onChapterSelected(event: any): void {
  const chapterIds = event.map((chapter:any) => chapter.id);
  this.topicsService.getTopicsByChapters(chapterIds).subscribe((data) => {
    this.topics = data;
  });
}


 generateQuestionPaper(): void {
    if (this.questionPaperForm.valid) {
      const formValue = this.questionPaperForm.value;
      console.log(formValue);
      this.questionPaperService.generateQuestionPaper(formValue).subscribe(
        (response) => {
          console.log(response); // Handle the response from the backend
          // Additional logic for handling a successful response
        },
        (error) => {
          console.error('Error:', error);
          // Handle the error, e.g., by setting an error message
        }
      );
    } else {
      // Optionally, handle the case where the form is invalid
      console.error('Form is invalid');
    }
 }
}