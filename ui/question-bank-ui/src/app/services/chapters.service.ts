import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChaptersService {
  private url = 'http://localhost:8000/api/chapters/';
  constructor(private httpClient: HttpClient) { }
  getChapters(){
    return this.httpClient.get(this.url);
  }
}
