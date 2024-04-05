import { Component } from '@angular/core';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {
  questions: any = [];

 constructor(private service: QuestionsService) { }

 ngOnInit(): void {
    this.service.getQuestions().subscribe(data => {
      this.questions = data;
      console.log(this.questions);
    });
 }
}
