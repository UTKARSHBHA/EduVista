import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  private apiUrl = 'http://localhost:8000/api/candidates/'; // Adjust the URL accordingly

  constructor(private http: HttpClient) { }

  createCandidate(candidateData: any) {
    return this.http.post<any>(this.apiUrl, candidateData);
  }
  getCandidates(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteCandidate(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete<any>(url);
  }
  
  
}