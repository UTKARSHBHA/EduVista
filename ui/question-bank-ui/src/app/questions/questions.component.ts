import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChaptersService } from '../services/chapters.service';
import { TopicsService } from '../services/topics.service';
import { SubjectsService } from '../services/subjects.service';
import { StandardsService } from '../services/standards.service';
import { CommonModule } from '@angular/common';
import { QuestionDetailsComponent } from './questions-details/questions-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    QuestionDetailsComponent,
  ],
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

  questionId: any = null;
  constructor(
    private formBuilder: FormBuilder,
    private questionsService: QuestionsService,
    private chaptersService: ChaptersService,
    private topicsService: TopicsService,
    private subjectsService: SubjectsService,
    private standardsService: StandardsService,
    private route: ActivatedRoute
  ) {
    this.questionForm = this.formBuilder.group({
      question_text: ['', Validators.required],
      type: ['', Validators.required],
      difficulty_level: ['', Validators.required],
      standard: ['', Validators.required],
      subject: ['', Validators.required],
      marks: ['', Validators.required],
      topic: ['', Validators.required],
      chapter: ['', Validators.required],
      // image: [null],
      options: this.formBuilder.array([]),
      // options: this.formBuilder.array([
      //   this.formBuilder.group({
      //     text: ['', Validators.required],
      //     is_correct: [false],
      //   }),
      //   this.formBuilder.group({
      //     text: ['', Validators.required],
      //     is_correct: [false],
      //   }),
      // ]),
    });
  }

  ngOnInit(): void {
    this.loadQuestions();
    this.loadChapters();
    this.loadTopics();
    this.loadSubjects();
    this.loadStandards();

    this.questionId = this.route.snapshot.paramMap.get('id');

    if (this.questionId) {
      this.questionsService
        .getQuestionById(+this.questionId)
        .subscribe((question) => {
          this.questionForm.patchValue(question);
          console.log(question);
          // Assuming you have a method to set the options form array based on the question's options
          this.setOptionsFormArray(question.options);
        });
    } else {
      
      this.questionForm.get('type')?.valueChanges.subscribe(selectedType => {
        if (selectedType === 'mcq') {
            // Clear any existing options
            this.optionsArray.clear();
            // Add two pre-built options
            this.addOption();
            this.addOption();
        }
        else{
            this.optionsArray.clear();

        }

    });
    }
  }

  setOptionsFormArray(options: any[]): void {
    const optionsFormArray = this.questionForm.get('options') as FormArray;
    options.forEach((option) => {
      optionsFormArray.push(
        this.formBuilder.group({
          text: [option.text, Validators.required],
          is_correct: [option.is_correct],
        })
      );
    });
  }

  loadStandards(): void {
    this.standardsService.getStandards().subscribe((data: any) => {
      this.standards = data;
    });
  }
  loadQuestions(): void {
    this.questionsService.getQuestions().subscribe((data) => {
      this.questions = data;
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

  loadSubjects(): void {
    this.subjectsService.getSubjects().subscribe((data: any) => {
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
        next: (response) => {
          console.log(response);
          this.loadQuestions();
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
  @ViewChild('fileInput') fileInput!: ElementRef;

  onSubmit(): void {
    console.log('on submit clicked');
    console.log(this.questionId);
    console.log(this.questionForm.value);
    console.log(this.questionForm.errors);
    console.log(this.questionForm.valid);
    if (this.questionForm.valid) {
      
      if (this.questionId) {
        // console.log(formData);
        this.questionsService
          .updateQuestion(this.questionId, this.questionForm.value)
          .subscribe({
            next: (data) => {
              console.log('Question updated:', data);
              this.loadQuestions(); // Refresh the list of questions
              this.questionForm.reset(); // Reset the form
              this.selectedFile = null; // Clear the selected file
              this.fileInput.nativeElement.value = ''; // Clear the file input
            },
            error: (error) => {
              console.error('Error updating question', error);
            },
          });
      } else {
        console.log(this.questionForm.value);
       

        this.questionsService.addQuestion(this.questionForm.value).subscribe({
          next: (data) => {
            console.log('Question added:', data);
            this.questions.push(data);
            this.questionForm.reset();
            this.selectedFile = null;
            this.fileInput.nativeElement.value = '';
          },
          error: (error) => {
            console.error('Error adding question', error);
          },
        });
      }
    }
  }

  resetForm() {
    this.questionForm.reset();
    this.optionsArray.clear();
  }

  // Method to get the options form array
  get optionsArray() {
    return this.questionForm.get('options') as FormArray;
  }

  // Method to add a new option to the form array
  addOption() {
    this.optionsArray.push(
      this.formBuilder.group({
        text: ['', Validators.required],
        is_correct: [false],
      })
    );
  }

  // Method to remove an option from the form array
  removeOption(index: number) {
    this.optionsArray.removeAt(index);
  }
}
