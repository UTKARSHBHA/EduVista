// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/api/token/';

  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  saveToken(token: any) {
    localStorage.setItem('access_token', token.access);
    localStorage.setItem('refresh_token', token.refresh);
  }

  signup(user: any): Observable<any> {
    const signupUrl = 'http://localhost:8000/api/signup/';
    return this.http.post<any>(signupUrl, user);
  }
}
