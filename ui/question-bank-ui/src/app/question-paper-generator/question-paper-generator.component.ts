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


import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-question-paper-generator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule, FormsModule,    DragDropModule,
  ],
  templateUrl: './question-paper-generator.component.html',
  styleUrl: './question-paper-generator.component.css',
})
export class QuestionPaperGeneratorComponent {
  questionPaperForm: FormGroup;
  standards: any[] = [];
  subjects: any[] = [];
  topics: any[] = [];
  chapters: any[] = [];

  filteredSubjects: any[] = [];
  filteredChapters: any[] = [];
  filteredTopics: any[] = [];

  totalMarks: number = 0; // Initialize total marks
  questionCount: number = 0;

  errorMessage: string | null = null;
  isAllTopicsSelected: boolean = false ;

  questionPaper: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private standardsService: StandardsService,
    private subjectsService: SubjectsService,
    private topicsService: TopicsService,
    private chaptersService: ChaptersService,
    private questionPaperService: QuestionPaperService
  ) {
    this.questionPaperForm = this.formBuilder.group({
      standard: [null, Validators.required],
      subject: [null, Validators.required],
      chapters: [[]],
      topics: [[]],
      questionsGrid: this.formBuilder.array([this.createQuestionRow()]),
    });
  }

  ngOnInit(): void {
    this.loadStandards();
    this.loadSubjects();
    this.loadChapters();
    this.loadTopics();
  }

  createQuestionRow(): FormGroup {
    return this.formBuilder.group({
      type: ['', Validators.required],
      marks: [0, [Validators.required, Validators.min(0)]],
      count: [0, [Validators.required, Validators.min(0)]],
    });
  }
  get questionsGrid(): FormArray {
    return this.questionPaperForm.get('questionsGrid') as FormArray;
  }
  addQuestionRow(): void {
    this.questionsGrid.push(this.createQuestionRow());
    // this.updateTotalMarksAndCount();
  }

  // Method to remove a row from the grid
  removeQuestionRow(index: number): void {
    const questionRow = this.questionsGrid.at(index);
    const marks = questionRow.get('marks')?.value;
    const count = questionRow.get('count')?.value;
    this.totalMarks -= marks * count;
    this.questionCount -= count;
    this.questionsGrid.removeAt(index);
  }

  updateTotalMarksAndCount(): void {
    this.totalMarks = 0;
    this.questionCount = 0;
    this.questionsGrid.controls.forEach((questionRow) => {
      const marks = questionRow.get('marks')?.value;
      const count = questionRow.get('count')?.value;
      this.totalMarks += marks * count;
      this.questionCount += count;
    });
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
  loadChapters(): void {
    this.chaptersService.getChapters().subscribe((data: any) => {
      this.chapters = data;
    });
  }
  loadTopics(): void {
    this.topicsService.getTopics().subscribe((data: any) => {
      this.topics = data;
    });
  }
  onStandardSelected(event: any): void {
    const standardId = event.id;
    // Assuming 'standards' is an array of all standards loaded on init
    const selectedStandard = this.standards.find(
      (standard) => standard.id === standardId
    );
    if (selectedStandard && selectedStandard.subjects) {
      // Filter subjects based on the IDs stored in the selected standard's 'subjects' key
      this.filteredSubjects = this.subjects.filter((subject) =>
        selectedStandard.subjects.includes(subject.id)
      );
      this.filteredChapters = []; // Reset filtered chapters when standard changes
      this.filteredTopics = []; // Reset filtered topics when standard changes
      this.questionPaperForm.get('subjects')?.reset();
      this.questionPaperForm.get('chapters')?.reset();
      this.questionPaperForm.get('topics')?.reset();
    } else {
      // If no standard is selected or it has no subjects, reset the filtered subjects list
      this.filteredSubjects = [];
    }
  }

  onSubjectSelected(event: any): void {
    if(!event){

      this.filteredChapters = []; 
      this.filteredTopics = []; // Reset filtered topics when subject changes
      this.questionPaperForm.get('chapters')?.reset();
      this.questionPaperForm.get('topics')?.reset();
      return;
    }
    // console.log(event);
    

    const subjectId = event.id;
    // console.log(subjectId);
    
    // console.log(this.isAllTopicsSelected);
    this.isAllTopicsSelected = false;
    // console.log(this.isAllTopicsSelected);
  

    this.filteredChapters = this.chapters.filter(
      (chapter) => chapter.subject === subjectId
    );
    console.log(this.filteredChapters);

    this.filteredTopics = []; // Reset filtered topics when subject changes
    this.questionPaperForm.get('chapters')?.reset();
    this.questionPaperForm.get('topics')?.reset();

  }

  onChapterSelected(event: any): void {
    const chapterIds = event.map((chapter: any) => chapter.id);
    console.log(chapterIds);
    // Filter topics based on the selected chapters
    this.filteredTopics = this.topics.filter((topic) =>
      chapterIds.includes(topic.chapter)
    );
    this.questionPaperForm.get('topics')?.reset();
  }

  generateQuestionPaper(): void {
    if (this.questionPaperForm.valid) {
      const formValue = this.questionPaperForm.value;
      console.log(formValue);
      this.questionPaperService.generateQuestionPaper(formValue).subscribe(
        (response) => {
          console.log(response); // Handle the response from the backend
          this.errorMessage = null;
          this.questionPaper = response.questions;
          // this.questionPaperForm.reset();


          // Additional logic for handling a successful response
        },
        (error) => {
          console.error('Error:', error);
          // Handle the error, e.g., by setting an error message
          this.errorMessage = error.error.error;
        }
      );
    } else {
      // Optionally, handle the case where the form is invalid
      console.error('Form is invalid');
      // this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  toggleSelectAllChapters(event: any): void {
    this.isAllTopicsSelected = event.target.checked; // Update the property based on the checkbox state
    if (this.isAllTopicsSelected) {
        // Select all chapters
        this.questionPaperForm.get('chapters')?.setValue(this.filteredChapters.map(chapter => chapter.id));
    } else {
        // Deselect all chapters
        this.questionPaperForm.get('chapters')?.setValue([]);
    }
    const selectedChapterIds = this.questionPaperForm.get('chapters')?.value;

    this.filteredTopics = this.topics.filter(topic => selectedChapterIds.includes(topic.chapter));

}

  toggleSelectAllTopics(event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.questionPaperForm
        .get('topics')
        ?.setValue(this.filteredTopics.map((topic) => topic.id));
    } else {
      this.questionPaperForm.get('topics')?.setValue([]);
    }
  }



// printQuestionPaper(): void {
//   const printContent = document.getElementById('questionPaper')?.innerHTML;
//   const originalContent = document.body.innerHTML;
 
//   if (!printContent) {
//      alert('Nothing to print.');
//      return;
//   }
 
//   document.body.innerHTML = printContent;
 
//   window.print();
 
//   document.body.innerHTML = originalContent;
//  }

printQuestionPaper(): void {
  const printContent = document.getElementById('questionPaper')?.innerHTML;
  if (printContent) {
     const printWindow = window.open('', '_blank');
     printWindow?.document.open();
     printWindow?.document.write('<html><head><title>Print</title>');
 
     // Dynamically inject print-specific CSS
     printWindow?.document.write('<style>');
     printWindow?.document.write(`

     
       @media print {
         body {
           margin: 0;
           padding: 0;
           background-color: white;
         }
 
         #questionPaper {
           width: 100%;
           padding: 20px;
           box-shadow: none;
         }
 
         .question {
           border: 1px solid gray;
           padding: 10px;
           margin-bottom: 10px;
           page-break-inside: avoid;
         }
 
         .questionMetaData {
           display: flex;
           justify-content: flex-end;
           gap: 10px;
         }
 
         .options {
           padding-left: 20px;
         }
 
         .print-btn {
           display: none;
         }
 
         /* Additional print-specific styles can be added here */
       }
     `);
     printWindow?.document.write('</style>');
 
     printWindow?.document.write('</head><body>');
     printWindow?.document.write(printContent);
     printWindow?.document.write('</body></html>');
     printWindow?.document.close();
     printWindow?.print();
  }
 }
 drop(event: CdkDragDrop<string[]>) {
  // Get the current form array
  const questionsGrid = this.questionPaperForm.get('questionsGrid') as FormArray;
 
  // Move the item in the form array to reflect the new order
  moveItemInArray(questionsGrid.controls, event.previousIndex, event.currentIndex);
 
  // Create a new form array with the items in the new order
  const newQuestionsGrid = new FormArray(questionsGrid.controls);
 
  // Replace the old form array with the new one
  this.questionPaperForm.setControl('questionsGrid', newQuestionsGrid);
 }



}