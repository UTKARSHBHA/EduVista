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
  questionPaper: any[] = [];
 
  
  standards: any[] = [];
  subjects: any[] = [];
  topics: any[] = [];
  chapters: any[] = [];
  selectedStandard: any = null;
  selectedSubject: any = null;
  selectedTopics: any[] = [];
  selectedChapters: any[] = [];

 
  constructor(
    private formBuilder: FormBuilder,
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
     this.loadStandards();
  }
  
  ngOnInit() {
    // Initialize chapters and topics FormArrays
    this.initChaptersFormArray();
    this.initTopicsFormArray();
 }

 initChaptersFormArray() {
    const chaptersArray = this.questionPaperForm.get('chapters') as FormArray;
    this.chapters.forEach(chapter => {
      chaptersArray.push(new FormControl(false)); // Initialize each chapter checkbox as unchecked
    });
 }

 initTopicsFormArray() {
    const topicsArray = this.questionPaperForm.get('topics') as FormArray;
    this.topics.forEach(topic => {
      topicsArray.push(new FormControl(false)); // Initialize each topic checkbox as unchecked
    });
 }

  loadStandards(): void {
    // this.standardsService.getStandards().subscribe(data => {
    //   this.standards = data;
    // });
    this.standards = [
      { id: 1, name: 'Standard 1' },
    { id: 2, name: 'Standard 2' },
    ];
 }

 onStandardSelected(e: any): void {
    // this.subjectsService.getSubjectsByStandard(standardId).subscribe(data => {
    //   this.subjects = data;
    //   this.selectedStandard = standardId;
    // });
    console.log(e.target.value);
    this.selectedStandard = e.target.value;
    this.subjects = [
      { id: 1, name: 'Subject 1' },
    { id: 2, name: 'Subject 2' },
    ];

  }

 onSubjectSelected(e: any): void {
    // this.topicsService.getTopicsBySubject(subjectId).subscribe(data => {
    //   this.topics = data;
    //   this.selectedSubject = subjectId;
    // });
    console.log(e.target.value);
    this.selectedSubject   = e.target.value;
    this.chapters = [
      { id: 1, name: 'Chapter 1' },
      { id: 2, name: 'Chapter 2' },
    ];
   }
   onChapterSelected(event: any, topicId: number): void {
    if (event.target.checked) {
        // If the checkbox is checked, add the topic ID to the selectedTopics array
        this.selectedChapters.push(topicId);
        console.log(this.selectedChapters);
        this.topics = [
          { id: 1, name: 'Topic 1' },
          { id: 2, name: 'Topic 2' },
        ];
    } else {
        // If the checkbox is unchecked, remove the topic ID from the selectedChapters array
        const index = this.selectedChapters.indexOf(topicId);
        if (index > -1) {
            this.selectedChapters.splice(index, 1);
        }
    }
    // Optionally, you can update a form control with the selected topics here
  }

 onTopicSelected(event: any, topicId: number): void {
  if (event.target.checked) {
      // If the checkbox is checked, add the topic ID to the selectedTopics array
      this.selectedTopics.push(topicId);
  } else {
      // If the checkbox is unchecked, remove the topic ID from the selectedTopics array
      const index = this.selectedTopics.indexOf(topicId);
      if (index > -1) {
          this.selectedTopics.splice(index, 1);
      }
  }
  // Optionally, you can update a form control with the selected topics here
}
 
  generateQuestionPaper(): void {
    //  if (this.questionPaperForm.valid) {
       const selectedCriteria = this.questionPaperForm.value;
       console.log(selectedCriteria);
      
    //  }
  }
 }