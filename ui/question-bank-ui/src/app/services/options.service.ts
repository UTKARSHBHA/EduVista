import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class OptionsService {
 private apiUrl = 'http://localhost:8000/api/options/';

 constructor(private httpClient: HttpClient) { }

 getOptions(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl);
 }

 addOption(option: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, option);
 }
 deleteOption(optionId: number): Observable<any> {
   return this.httpClient.delete(`${this.apiUrl}${optionId}/delete/`);
}
}