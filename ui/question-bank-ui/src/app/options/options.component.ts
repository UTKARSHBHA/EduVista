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
       // Explicitly set is_correct to false if the checkbox is not checked
       const optionData = this.optionForm.value;
       optionData.is_correct = optionData.is_correct || false;
   
       this.optionsService.addOption(optionData).subscribe(data => {
         this.options.push(data);
         this.optionForm.reset();
       });
    }
   }

  deleteOption(optionId: number): void {
    if (confirm('Are you sure you want to delete this option?')) {
        this.optionsService.deleteOption(optionId).subscribe({
            next: response => {
                console.log(response);
                // Reload the options list to ensure it's up-to-date
                this.loadOptions();
            },
            error: error => {
                console.error(error);
            }
        });
    }
 }

 }