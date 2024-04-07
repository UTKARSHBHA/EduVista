import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private url = 'http://localhost:8000/api/subjects/';
  constructor(private httpClient: HttpClient) { }
  getSubjects(){
    return this.httpClient.get(this.url);
  }

  createSubject(subject: any): Observable<any> {
    return this.httpClient.post(this.url, subject);
 }
}
