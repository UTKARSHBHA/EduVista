import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ChaptersService {
  // private url = 'http://localhost:8000/api/chapters/';
  private url = environment.apiUrl + 'chapters/';

  constructor(private httpClient: HttpClient) {}
  getChapters(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  addChapter(chapter: any): Observable<any> {
    return this.httpClient.post(this.url, chapter);
  }
  deleteChapter(chapterId: number): Observable<any> {
    return this.httpClient.delete(`${this.url}${chapterId}`);
  }

  getChaptersBySubject(subjectId: number): Observable<any> {
    return this.httpClient.get(`${this.url}?subject=${subjectId}`);
  }
}
