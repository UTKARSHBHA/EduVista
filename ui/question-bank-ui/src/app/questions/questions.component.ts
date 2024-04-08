import { Component } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {
  questions: any = [];
  selectedQuestionType: string = 'Multiple choice';
  selectedDifficulty: number | null = null;
  question: string = '';
  option1: string = '';
  option2: string = '';
  option3: string = '';
  answer: string = '';

 constructor(private service: QuestionsService) { }

 ngOnInit(): void {
    // this.service.getQuestions().subscribe(data => {
    //   this.questions = data;
    //   console.log(this.questions);
    // });
 }
 addQuestion() {
  if (this.selectedQuestionType === 'Multiple choice') {
    console.log('Question:', this.question);
    console.log('Option 1:', this.option1);
    console.log('Option 2:', this.option2);
    console.log('Option 3:', this.option3);
  } else if (this.selectedQuestionType === 'Subjective') {
    console.log('Question:', this.question);
    console.log('Answer:', this.answer);
  }
  // You can perform further actions here like sending data to server, etc.
  this.resetForm();
}

resetForm() {
  this.question = '';
  this.option1 = '';
  this.option2 = '';
  this.option3 = '';
  this.answer = '';
}
}
