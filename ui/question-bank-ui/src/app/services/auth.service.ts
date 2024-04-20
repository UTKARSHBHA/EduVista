// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
 
  // getCsrfToken(): Observable<string> {
  //   return this.http.get('http://localhost:8000/api/csrf/', { responseType: 'text' }).pipe(
  //     map(response => response as string)
  //   );
  // }
   
  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);
   
    return this.http.post('http://localhost:8000/api/login/', body.toString(), {
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         
       },
      //  credentials: 'same-origin',
    });
   }
 }