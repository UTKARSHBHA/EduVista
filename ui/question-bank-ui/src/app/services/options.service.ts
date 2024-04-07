import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class OptionsService {
 private apiUrl = 'http://localhost:8000/api/options/';

 constructor(private http: HttpClient) { }

 getOptions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
 }

 addOption(option: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, option);
 }
}