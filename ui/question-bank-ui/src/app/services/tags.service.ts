import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
//  private url = 'http://localhost:8000/api/subjects/';
private url = environment.apiUrl + 'tags/';

constructor(private httpClient: HttpClient) {}

getTags(): Observable<any> {
  return this.httpClient.get(this.url);
}

createTag(subject: any): Observable<any> {
  return this.httpClient.post(this.url, subject);
}

deleteTag(subjectId: number): Observable<any> {
  return this.httpClient.delete(`${this.url}${subjectId}`);
}

//   getTagsByStandard(standardId: number): Observable<any> {
//     return this.httpClient.get(`${this.url}?standard=${standardId}`);
//   }
}
