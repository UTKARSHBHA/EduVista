import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntranceTestService {

  private apiUrl = 'http://localhost:8000/api/entrance-tests/'; // Adjust the URL accordingly

  constructor(private http: HttpClient) { }

  createEntranceTest(testData: any) {
    return this.http.post<any>(this.apiUrl, testData);
  }

  
}