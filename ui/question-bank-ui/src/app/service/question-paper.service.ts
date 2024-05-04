import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionPaperService {

  private apiUrl = 'http://localhost:8000/api/generate-question-paper/';
 
  constructor(private http: HttpClient) { }
 
  generateQuestionPaper(formValue: any): Observable<any> {
     return this.http.post<any>(this.apiUrl, formValue);
  }

  saveQuestionPaper(questionPaperData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/question-papers/', questionPaperData);
 }
 }