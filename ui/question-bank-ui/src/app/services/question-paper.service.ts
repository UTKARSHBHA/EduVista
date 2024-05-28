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
 getQuestionPapers(): Observable<any> {
  return this.http.get<any>('http://localhost:8000/api/question-papers/');
}

deleteQuestionPaper(id: number): Observable<any> {
  const url = `${'http://localhost:8000/api/question-papers/'}${id}/`;
  return this.http.delete<any>(url);
}

getQuestionPaperById(id: string): Observable<any> {
  const url = `${'http://localhost:8000/api/question-papers/'}${id}/`;
  return this.http.get<any>(url);
}

getNewQuestion(questionToReplace: any, selectedTags: any,  existingQuestions: any[]): Observable<any> {
  // Convert the existing questions array to a format that can be sent in the request
  const existingQuestionsIds = existingQuestions.map(q => q.id).join(',');

  // Create a request object that includes the details of the question to replace and the IDs of existing questions
  
  const requestObject = {
    questionToReplace,
    selectedTags,
    existingQuestionsIds
  };

  // Make a POST request to your backend API with the request object
  // Adjust the URL as needed
  return this.http.post<any>('http://localhost:8000/api/get-new-question/', requestObject);
}

updateQuestionPaper(questionPaperID: any,questionPaper: any[]): Observable<any> {
  console.log(questionPaper);
  return this.http.put(`${'http://localhost:8000/api/question-papers/'}${questionPaperID}/`, questionPaper);
  
}

 }