import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
 providedIn: 'root'
})
export class OptionsService {
//  private apiUrl = 'http://localhost:8000/api/options/';
private url = environment.apiUrl+'options/';


 constructor(private httpClient: HttpClient) { }

 getOptions(): Observable<any> {
    return this.httpClient.get<any>(this.url);
 }

 addOption(option: any): Observable<any> {
    return this.httpClient.post<any>(this.url, option);
 }
 deleteOption(optionId: number): Observable<any> {
   return this.httpClient.delete(`${this.url}${optionId}`);
}
getOptionsByQuestionId(questionId: number): Observable<any> {
   return this.httpClient.get<any>(`${this.url}?question=${questionId}`);
 }
}