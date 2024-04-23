import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from '../services/questions.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StandardsService } from '../services/standards.service';
import { SubjectsService } from '../services/subjects.service';
import { TopicsService } from '../services/topics.service';
import { ChaptersService } from '../services/chapters.service';

@Component({
  selector: 'app-question-paper-generator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './question-paper-generator.component.html',
  styleUrl: './question-paper-generator.component.css'
})
export class QuestionPaperGeneratorComponent {
  questionPaperForm: FormGroup;
  standards: any[] = [];
  subjects: any[] = [];
  topics: any[] = [];
  chapters: any[] = [];
  selectedTopics: any[] = [];
  selectedChapters: any[] = [];

 constructor(
    private formBuilder: FormBuilder,
    private standardsService: StandardsService,
    private subjectsService: SubjectsService,
    private topicsService: TopicsService,
    private chaptersService: ChaptersService
 ) {
    this.questionPaperForm = this.formBuilder.group({
      standard: ['', Validators.required],
      subject: ['', Validators.required],
      chapters: this.formBuilder.array([]),
      topics: this.formBuilder.array([]),
      easy: [0],
      medium: [0],
      hard: [0]
    });
 }

 ngOnInit(): void {
    this.loadStandards();
    this.loadSubjects();
 }

 loadStandards(): void {
    this.standardsService.getStandards().subscribe((data:any) => {
      this.standards = data;
    });
 }
 loadSubjects(): void {
    this.subjectsService.getSubjects().subscribe((data:any) => {
      this.subjects = data;
    });
 }

//  onStandardSelected(e: any): void {
//     const standardId = e.target.value;
//     this.selectedStandard = standardId;
//     this.subjectsService.getSubjectsByStandard(standardId).subscribe(data => {
//       this.subjects = data;
//       this.selectedSubject = null; // Reset selected subject
//       this.topics = []; // Reset topics
//       this.chapters = []; // Reset chapters
//     });
//  }

 onSubjectSelected(e: any): void {
    const chapterId = e.target.value;
    // this.selectedSubject = chapterId;
    this.chaptersService.getChaptersBySubject(chapterId).subscribe(data => {
      this.chapters = data;
      console.log(this.chapters);
      this.topics = []; // Reset chapters based on the new subject
    });
 }

 onChapterSelected(event: any, chapterId: number): void {
    if (event.target.checked) {
      this.selectedChapters.push(chapterId);
    } else {
      const index = this.selectedChapters.indexOf(chapterId);
      if (index > -1) {
        this.selectedChapters.splice(index, 1);
      }
    }
    console.log(this.selectedChapters);
    
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
 }

 generateQuestionPaper(): void {
    if (this.questionPaperForm.valid) {
      const selectedCriteria = this.questionPaperForm.value;
      console.log(selectedCriteria);
      // Implement the logic to generate the question paper based on the selected criteria
    }
 }
}