import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private url = 'http://localhost:8000/api/chapters/';
  constructor(private httpClient: HttpClient) { }
  getOptions(){
    return this.httpClient.get(this.url);
  }
}
