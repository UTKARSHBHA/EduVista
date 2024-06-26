import { Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import {} from 'ngx-bootstrap';
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
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { StandardsComponent } from '../standards/standards.component';
import { SubjectsComponent } from '../subjects/subjects.component';
import { TopicsComponent } from '../topics/topics.component';
import { ChaptersComponent } from '../chapters/chapters.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagsComponent } from '../tags/tags.component';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NgSelectModule,MatDialogModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnInit {
  questionForm: FormGroup;
  questions: any[] = [];
  chapters: any[] = [];
  topics: any[] = [];
  subjects: any[] = [];
  tags: any[] = [];
  standards: any[] = [];

  questionId: any = null;
  StandardModal: MatDialogRef<StandardsComponent> | undefined;
  SubjectModal: MatDialogRef<SubjectsComponent> | undefined;
  TagModal: MatDialogRef<TagsComponent> | undefined;
  TopicModal: MatDialogRef<TopicsComponent> | undefined;
  ChapterModal: MatDialogRef<ChaptersComponent> | undefined;
  filteredSubjects: any[] = [];
  // filteredTags: any[] = [];
  filteredChapters: any[] = [];
  filteredTopics: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private questionsService: QuestionsService,
    private chaptersService: ChaptersService,
    private topicsService: TopicsService,
    private subjectsService: SubjectsService,
    private tagsService: TagsService,
    private standardsService: StandardsService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,

    @Optional() public dialogRef: MatDialogRef<QuestionsComponent>

  ) {
    this.questionForm = this.formBuilder.group({
      question_text: ['', Validators.required],
      type: ['', Validators.required],
      difficulty_level: ['', Validators.required],
      standard: ['', Validators.required],
      subject: ['', Validators.required],
      marks: ['', Validators.required],
      topics: [[], Validators.required],
      tags: [[], Validators.required],
      chapter: ['', Validators.required],
      image: [null],
      options: this.formBuilder.array([]),
    });
  } 

  ngOnInit(): void {
    this.loadChapters();
    this.loadTopics();
    this.loadTags();
    this.loadSubjects();
    this.loadStandards();

    this.filteredSubjects = [];
    this.filteredChapters = [];
    this.filteredTopics = [];

    this.questionId = this.data.id;


    if (this.questionId) {
   


      this.questionsService
        .getQuestionById(+this.questionId)
        .subscribe((question) => {
          console.log(question);
          this.onStandardSelected(question.standard);
          this.onSubjectSelected(question.subject);
          this.onChapterSelected(question.chapter);
          this.questionForm.patchValue(question);
          

          console.log(question);
          // Assuming you have a method to set the options form array based on the question's options
          this.setOptionsFormArray(question.options);

        });
    } else {
      this.questionForm.get('type')?.valueChanges.subscribe((selectedType) => {
        if (selectedType === 'mcq') {
          // Clear any existing options
          this.optionsArray.clear();
          // Add two pre-built options
          this.addOption();
          this.addOption();
        } else if (selectedType === 'tf') {
          // Clear any existing options
          this.optionsArray.clear();

          this.optionsArray.push(
            this.formBuilder.group({
              text: ['True', Validators.required],
              is_correct: [false],
            })
          );
          this.optionsArray.push(
            this.formBuilder.group({
              text: ['False', Validators.required],
              is_correct: [false],
            })
          );
        } else {
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

  loadStandards(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.standardsService.getStandards().subscribe(
        (data: any) => {
          this.standards = data;
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  loadChapters(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.chaptersService.getChapters().subscribe(
        (data: any) => {
          this.chapters = data;
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  loadTopics(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.topicsService.getTopics().subscribe(
        (data: any) => {
          this.topics = data;
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  loadSubjects(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.subjectsService.getSubjects().subscribe(
        (data: any) => {
          this.subjects = data;
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  loadTags(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.tagsService.getTags().subscribe(
        (data: any) => {
          this.tags = data;
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  




  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.questionForm.get('image')?.setValue(reader.result);
      };
    } else {
      this.questionForm.get('image')?.setValue(null);
    }
  }

  // deleteQuestion(questionId: number): void {
  //   if (confirm('Are you sure you want to delete this question?')) {
  //     this.questionsService.deleteQuestion(questionId).subscribe({
  //       next: (response) => {
  //         console.log(response);
  //         // this.loadQuestions();
  //       },
  //       error: (error) => {
  //         console.error(error);
  //       },
  //     });
  //   }
  // }
  @ViewChild('fileInput') fileInput!: ElementRef;

  onSubmit(): void {
    console.log('on submit clicked');
 
    if (this.questionForm.valid) {
      console.log("valid");
      if (this.questionId) {
        // console.log(formData);
        this.questionsService
          .updateQuestion(this.questionId, this.questionForm.value)
          .subscribe({
            next: (data) => {
              console.log('Question updated:', data);
              this.questionForm.reset(); // Reset the form
              this.selectedFile = null; // Clear the selected file
              this.fileInput.nativeElement.value = ''; // Clear the file input
              alert("Successfully updated the question");
              this.router.navigate(['/questions']);
              
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
            alert("Successfully added question");
          },
          error: (error) => {
            console.error('Error adding question', error);
          },
        });
      }
      this.dialogRef?.close({ refresh: true});
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

  openStandardModal() {
    this.StandardModal = this.matDialog.open(StandardsComponent, {
      height: '90vh',
      width: '90vw',
      disableClose: true,
    });
    this.StandardModal.afterClosed().subscribe(async (result: any) => {
      console.log('The dialog was closed', result);
      if(result && result.refresh){
        await this.loadStandards();
        this.updateFilteredData();
        // make this async

      }
    });

  }
  openSubjectModal() {
    this.SubjectModal = this.matDialog.open(SubjectsComponent, {
      disableClose: true,
      height: '90vh',
      width: '90vw',
    });
    this.SubjectModal.afterClosed().subscribe(async (result: any) => {
      console.log('The dialog was closed', result);
      
      if(result && result.refresh){
        await this.loadSubjects();
        this.updateFilteredData();
      }
    });
    
  }
  openTagModal() {
    this.TagModal = this.matDialog.open(TagsComponent, {
      disableClose: true,
      height: '90vh',
      width: '90vw',
    });
    this.TagModal.afterClosed().subscribe(async (result: any) => {
      console.log('The dialog was closed', result);
      
      if(result && result.refresh){
        await this.loadTags();
        this.updateFilteredData();
      }
    });
    
  }
  openTopicModal() {
    this.TopicModal = this.matDialog.open(TopicsComponent, {
      disableClose: true,
      height: '90vh',
      width: '90vw',
    });
    this.TopicModal.afterClosed().subscribe(async (result: any) => {
      console.log('The dialog was closed', result);
      
      if(result && result.refresh){
        await this.loadTopics();
        this.updateFilteredData();
      }
    });
  }
  openChapterModal() {
    this.ChapterModal = this.matDialog.open(ChaptersComponent, {
      disableClose: true,
      height: '90vh',
      width: '90vw',
    });
    this.ChapterModal.afterClosed().subscribe(async (result: any) => {
      console.log('The dialog was closed', result);
      
      if(result && result.refresh){
        await this.loadChapters();
        this.updateFilteredData();
      }
    });
  }

  onStandardSelected(e: any) {
    // console.log(e);
    // console.log(this.questionForm);
    if(e){

      let standardId = e.id;
      this.questionForm.patchValue({standard: standardId});
      // console.log("standardId", standardId);
      // const standardId = event.id;
      // Find the selected standard from the standards list
      const selectedStandard = this.standards?.find(
        (standard) => standard.id === standardId
      );
      console.log("selected standard", selectedStandard);
    if (selectedStandard && selectedStandard.subjects) {
      // Filter subjects based on the IDs stored in the selected standard's 'subjects' key
      this.filteredSubjects = this.subjects.filter((subject) =>
        selectedStandard.subjects.includes(subject.id)
      );
    } else {
      // If no standard is selected or it has no subjects, reset the filtered subjects list
      this.filteredSubjects = [];
    }
  }
  else{
    this.filteredSubjects = [];

  }
    // Optionally, reset the selected subject, chapter, and topic
    this.questionForm.get('subject')?.setValue(null);
    this.questionForm.get('chapter')?.setValue(null);
    this.questionForm.get('topics')?.setValue(null);
    this.filteredChapters = [];
    this.filteredTopics = [];
  }

  onSubjectSelected(e: any) {
    // console.log(e);
    console.log(this.questionForm);

    if(e){

      const subjectId = e.id;
      this.questionForm.patchValue({subject: subjectId});
      this.filteredChapters = this.chapters.filter(
        (chapter) => chapter.subject === subjectId
      );
    }
    else{
      this.filteredChapters = [];

    }
      // Optionally, reset the selected chapter and topic
      this.questionForm.get('chapter')?.setValue(null);
      this.questionForm.get('topics')?.setValue(null);
      this.filteredTopics = [];
  }
  // onTagSelected(subjectId: any) {
  //   // const subjectId = event.id;
  //   this.filteredChapters = this.chapters.filter(
  //     (chapter) => chapter.subject === subjectId
  //   );
  //   // Optionally, reset the selected chapter and topic
  //   this.questionForm.get('chapter')?.setValue(null);
  //   this.questionForm.get('topics')?.setValue(null);
  //   this.filteredTopics = [];
  // }

  onChapterSelected(e: any) {
    console.log(this.questionForm);

    if(e){

      const chapterId = e.id;
      this.questionForm.patchValue({chapter: chapterId});
      this.filteredTopics = this.topics.filter(
        (topic) => topic.chapter === chapterId
      );
      console.log(this.filteredTopics);
      // Optionally, reset the selected topic
      this.questionForm.get('topics')?.setValue(null);
    }
  }


  updateFilteredData(): void {
    // console.log(this.questionForm);
    // this.loadStandards();
    // this.loadSubjects();
    // this.loadChapters();
    // this.loadTopics();
    // console.log('topics',this.topics);
    // console.log(this.questionForm);

    const standard = this.questionForm.get('standard')?.value;
    const subject = this.questionForm.get('subject')?.value;
    const chapter = this.questionForm.get('chapter')?.value;

    console.log(standard, subject, chapter);
    
    // console.log(standard);
    if (standard) {
      this.onStandardSelected({id: standard});  
    }
    // console.log(subject);
    if (subject) {
      this.onSubjectSelected({id: subject});
    }
    // console.log(chapter);
    if (chapter) {
      this.onChapterSelected({id: chapter});
    }
    
  }
}
