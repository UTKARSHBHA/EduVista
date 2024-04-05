import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private url = 'http://localhost:8000/api/subjects/';
  constructor(private httpClient: HttpClient) { }
  getSubjects(){
    return this.httpClient.get(this.url);
  }
}
