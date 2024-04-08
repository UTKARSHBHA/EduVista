import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChaptersService } from '../services/chapters.service';
import { TopicsService } from '../services/topics.service';
import { SubjectsService } from '../services/subjects.service';
import { StandardsService } from '../services/standards.service';
// import { ApiService } from '../api.service';
@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnInit {
  questionForm: FormGroup;
  questions: any[] = [];
  chapters: any[] = [];
  topics: any[] = [];
  subjects: any[] = [];
  standards: any[] = []; // Array to hold the list of standards

 
  constructor(private formBuilder: FormBuilder, private questionsService: QuestionsService, private chaptersService: ChaptersService, private topicsService: TopicsService, private subjectsService: SubjectsService, private standardsService: StandardsService) { 

    this.questionForm = this.formBuilder.group({
      question_text: ['', Validators.required],
      type: ['', Validators.required],
      difficulty_level: ['', Validators.required],
      standard: ['', Validators.required], // Use standard instead of class_level
      subject: ['', Validators.required],
      marks: ['', Validators.required],
      topic: ['', Validators.required],
      chapter: ['', Validators.required],
      image: [null] // Optional image
     });
  }
 
  ngOnInit(): void {
 
     this.loadQuestions();
     this.loadChapters();
     this.loadTopics();
     this.loadSubjects();
     this.loadStandards(); // Load standards when the component initializes

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
 
  // onSubmit(): void {
  //   console.log(this.questionForm);
  //    if (this.questionForm.valid) {
  //      this.questionsService.addQuestion(this.questionForm.value).subscribe(data => {
  //        console.log('Question added:', data);
  //        this.questions.push(data);
  //        this.questionForm.reset();
  //      });
  //    }
  //    else {
  //     console.log('Form is invalid');
  //  }
  // }

  onSubmit(): void {
    if (this.questionForm.valid) {
       const formData = new FormData();
       Object.keys(this.questionForm.value).forEach(key => {
         formData.append(key, this.questionForm.value[key]);
       });
       // Append the file only if a file has been selected
       if (this.selectedFile) {
         formData.append('image', this.selectedFile, this.selectedFile.name);
       }
   
       this.questionsService.addQuestion(formData).subscribe(data => {
         console.log('Question added:', data);
         this.questions.push(data);
         this.questionForm.reset();
       }, error => {
         console.error('Error adding question', error);
       });
    }
   }



  selectedFile: File | null = null;

onFileSelected(event: any) {
 this.selectedFile = <File>event.target.files[0];
}


// deleteQuestion(questionId: number): void {
//   if (confirm('Are you sure you want to delete this question?')) {
//       this.questionsService.deleteQuestion(questionId).subscribe({
//           next: response => {
//               console.log(response);
//               // Reload the questions list to ensure it's up-to-date
//               this.loadQuestions();
//           },
//           error: error => {
//               console.error(error);
//           }
//       });
//   }
// }

 }