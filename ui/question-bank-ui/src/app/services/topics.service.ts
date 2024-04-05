import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  private url = 'http://localhost:8000/api/topics/';
  constructor(private httpClient: HttpClient) { }
  getTopics(){
    return this.httpClient.get(this.url);
  }
}
