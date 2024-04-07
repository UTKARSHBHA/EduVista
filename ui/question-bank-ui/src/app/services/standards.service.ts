import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StandardsService {
  private url = 'http://localhost:8000/api/standards/';
  constructor(private httpClient: HttpClient) { }
  getStandards(){
    return this.httpClient.get(this.url);
  }

  addStandard(standard: any): Observable<any> {
    return this.httpClient.post(this.url, standard);
 }

}
