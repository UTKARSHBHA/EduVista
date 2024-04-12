// In questions.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class QuestionsService {
 private apiUrl = 'http://localhost:8000/api/questions/'; // Adjust the URL as necessary

 constructor(private http: HttpClient) { }

 getQuestions(): Observable<any> {
    return this.http.get(this.apiUrl);
 }

 addQuestion(question: any): Observable<any> {
    return this.http.post(this.apiUrl, question);
 }
 deleteQuestion(questionId: number): Observable<any> {
   return this.http.delete(`${this.apiUrl}${questionId}/delete/`);
}

getQuestionById(id: number): Observable<any> {
   return this.http.get(`${this.apiUrl}${id}/`);
}
// questions.service.ts

updateQuestion(questionId: number, questionData: FormData): Observable<any> {
   return this.http.put(`${this.apiUrl}${questionId}/`, questionData);
}
 // Add other methods as needed (e.g., updateQuestion, deleteQuestion)
}