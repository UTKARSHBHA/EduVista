import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private url = 'http://localhost:8000/api/questions/';
  constructor(private httpClient: HttpClient) { }
  getQuestions(){
    return this.httpClient.get(this.url);
  }
}
