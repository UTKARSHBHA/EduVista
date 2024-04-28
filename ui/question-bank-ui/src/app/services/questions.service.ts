// In questions.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
 providedIn: 'root'
})
export class QuestionsService {
//  private apiUrl = 'http://localhost:8000/api/questions/'; 
private url = environment.apiUrl+'questions/';


 constructor(private http: HttpClient) { }

 getQuestions(page: number, pageSize: number): Observable<any> {
   return this.http.get(`http://localhost:8000/api/questions?page=${page}&page_size=${pageSize}`);
  }

 addQuestion(question: any): Observable<any> {
    return this.http.post(this.url, question);
 }
 deleteQuestion(questionId: number): Observable<any> {
   return this.http.delete(`${this.url}${questionId}`);
}

getQuestionById(id: number): Observable<any> {
   return this.http.get(`${this.url}${id}`);
}
// questions.service.ts

updateQuestion(questionId: number, questionData: FormData): Observable<any> {
   return this.http.put(`${this.url}${questionId}/`, questionData);
}
 // Add other methods as needed (e.g., updateQuestion, deleteQuestion)
}