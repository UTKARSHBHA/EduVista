// In questions.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class QuestionsService {
 private apiUrl = 'http://localhost:8000/api/questions/'; // Adjust the URL as necessary

 constructor(private httpClient:  HttpClient) { }

 getQuestions(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
 }

 addQuestion(question: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, question);
 }

 deleteQuestion(questionId: number): Observable<any> {
   return this.httpClient.delete(`${this.apiUrl}${questionId}/delete/`);
}
 // Add other methods as needed (e.g., updateQuestion, deleteQuestion)
}