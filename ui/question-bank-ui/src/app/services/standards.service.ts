import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StandardsService {
  // private url = 'http://localhost:8000/api/standards/';\
  private url = environment.apiUrl+'standards/';

  constructor(private httpClient: HttpClient) { }
  getStandards(){
    return this.httpClient.get(this.url);
  }

  addStandard(standard: any): Observable<any> {
    return this.httpClient.post(this.url, standard);
 }
 deleteStandard(standardId: number): Observable<any> {
  return this.httpClient.delete(`${this.url}${standardId}`);
}

}
