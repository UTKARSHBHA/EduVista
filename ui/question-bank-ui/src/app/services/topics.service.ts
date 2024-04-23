import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  // private url = 'http://localhost:8000/api/topics/';
  private url = environment.apiUrl+'topics/';

  constructor(private httpClient: HttpClient) { }
  getTopics(): Observable<any> {
    return this.httpClient.get(this.url);
 }
  addTopic(topic: any): Observable<any> {
    return this.httpClient.post(this.url, topic);
 }
 deleteTopic(topicId: number): Observable<any> {
  return this.httpClient.delete(`${this.url}${topicId}`);
}

getTopicsBySubject(chapterId: number): Observable<any> {
  return this.httpClient.get(`${this.url}?chapter=${chapterId}`);
}
}
