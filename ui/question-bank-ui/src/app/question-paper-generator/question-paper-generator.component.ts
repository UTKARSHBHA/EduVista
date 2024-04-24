import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  // Inside your component class
  errorMessage: string = '';

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
      chapters: [[]],
      topics: [[]],
      easy: [0],
      medium: [0],
      hard: [0],
      mcq: [0], // MCQ Count
      tf: [0], // True/False Count
      descriptive: [0], // Descriptive Count
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

  onChapterSelected(event: any, chapterId: number): void {
    if (event.target.checked) {
      this.selectedChapters.push(chapterId);
    } else {
      const index = this.selectedChapters.indexOf(chapterId);
      if (index > -1) {
        this.selectedChapters.splice(index, 1);
      }
    }
    console.log('chapters', this.selectedChapters);
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
    if (this.questionPaperForm.valid && this.validateQuestionCounts()) {
      const selectedCriteria = this.questionPaperForm.value;
      console.log(selectedCriteria);
      // Implement the logic to generate the question paper based on the selected criteria
    }
  }

  validateQuestionCounts(): boolean {
    const form = this.questionPaperForm;
    const easyCount = form.get('easy')?.value;
    const mediumCount = form.get('medium')?.value;
    const hardCount = form.get('hard')?.value;
    const mcqCount = form.get('mcq')?.value;
    const tfCount = form.get('tf')?.value;
    const descriptiveCount = form.get('descriptive')?.value;

    // Calculate the total counts for difficulty levels and question types
    const totalDifficultyCount = easyCount + mediumCount + hardCount;
    const totalQuestionTypeCount = mcqCount + tfCount + descriptiveCount;

    // Check if the sums match
    if (totalDifficultyCount !== totalQuestionTypeCount) {
      // Set the error message if the sums do not match
      this.errorMessage =
        'The sum of different question types and difficulty levels must be the same.';
      return false;
    }
    this.errorMessage = ''; // Clear the error message if the sums match
    return true;
  }
}
