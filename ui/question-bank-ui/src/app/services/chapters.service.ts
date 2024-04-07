import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChaptersService {
  private url = 'http://localhost:8000/api/chapters/';
  constructor(private httpClient: HttpClient) { }
  getChapters(){
    return this.httpClient.get(this.url);
  }
  addChapter(chapter: any): Observable<any> {
    return this.httpClient.post(this.url, chapter);
 }
}
