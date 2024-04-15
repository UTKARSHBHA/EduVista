// ui/question-bank-ui/src/app/services/subjects.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class SubjectsService {
 private url = 'http://localhost:8000/questions/subjects/';

 constructor(private httpClient: HttpClient) { }

 getSubjects(): Observable<any> {
    return this.httpClient.get(this.url);
 }

 createSubject(subject: any): Observable<any> {
    return this.httpClient.post(this.url, subject);
 }

 deleteSubject(subjectId: number): Observable<any> {
    return this.httpClient.delete(`${this.url}${subjectId}`);
 }
}