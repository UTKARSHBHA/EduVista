import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../services/options.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent implements OnInit {
  optionForm: FormGroup;
  options: any[] = [];
  questions: any[] = [];
 
  constructor(private formBuilder: FormBuilder, private optionsService: OptionsService, private questionsService: QuestionsService) {
    this.optionForm = this.formBuilder.group({
      text: ['', Validators.required],
      is_correct: [false],
      question: ['', Validators.required] // Add a form control for the question
    });
  }
 
  ngOnInit(): void {
     this.loadOptions();
     this.loadQuestions();
  }
 
  loadOptions(): void {
     this.optionsService.getOptions().subscribe(data => {
       this.options = data;
     });
  }
  loadQuestions(): void {
     this.questionsService.getQuestions().subscribe(data => {
       this.questions = data;
     });
  }
 
  onSubmit(): void {
     if (this.optionForm.valid) {
       this.optionsService.addOption(this.optionForm.value).subscribe(data => {
         this.options.push(data);
         this.optionForm.reset();
       });
     }
  }
 }