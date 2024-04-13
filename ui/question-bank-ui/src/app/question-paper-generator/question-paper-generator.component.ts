import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from '../services/questions.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-paper-generator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './question-paper-generator.component.html',
  styleUrl: './question-paper-generator.component.css'
})
export class QuestionPaperGeneratorComponent implements OnInit {
  questionPaperForm: FormGroup;
  questionTypes = ['mcq', 'tf', 'descriptive'];
  difficultyLevels = ['easy', 'medium', 'hard'];
  questionPaper: any[] = [];
 
  constructor(private formBuilder: FormBuilder, private questionsService: QuestionsService) {
     this.questionPaperForm = this.formBuilder.group({});
     this.initializeFormControls();
  }
 
  ngOnInit(): void {}
 
  initializeFormControls(): void {
     this.questionTypes.forEach(type => {
       this.questionPaperForm.addControl(type, new FormControl(false));
       this.questionPaperForm.addControl(`${type}Quantity`, new FormControl(null, Validators.min(0)));
     });
     this.difficultyLevels.forEach(level => {
       this.questionPaperForm.addControl(level, new FormControl(false));
       this.questionPaperForm.addControl(`${level}Quantity`, new FormControl(null, Validators.min(0)));
     });
  }
 
  generateQuestionPaper(): void {
    //  if (this.questionPaperForm.valid) {
    //    const selectedTypes = this.questionTypes.filter(type => this.questionPaperForm.get(type).value);
    //    const selectedLevels = this.difficultyLevels.filter(level => this.questionPaperForm.get(level).value);
    //    const quantities = {};
    //    selectedTypes.forEach(type => {
    //      quantities[type] = this.questionPaperForm.get(`${type}Quantity`).value;
    //    });
    //    selectedLevels.forEach(level => {
    //      quantities[level] = this.questionPaperForm.get(`${level}Quantity`).value;
    //    });
    //    this.questionsService.generateQuestionPaper(quantities).subscribe(questions => {
    //      this.questionPaper = questions;
    //    });
    //  }
  }
 }