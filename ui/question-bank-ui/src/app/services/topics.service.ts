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

getTopicsByChapters(chapterIds: number[]): Observable<any> {
  // Assuming your backend supports querying topics by multiple chapters
  // You might need to adjust the query parameter based on your backend implementation
  const chapterIdsParam = chapterIds.join(',');
  return this.httpClient.get(`${this.url}?chapters=${chapterIdsParam}`);
}
}
