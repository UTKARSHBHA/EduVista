// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/api/token/';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  isTokenExpired(): boolean {
    const token = localStorage.getItem('access_token');
    return !token || this.jwtHelper.isTokenExpired(token);
   }


  login(credentials: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/token/', credentials).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
      })
    );
   }
   
   logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
   }
   
   refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
       return this.http.post<any>('http://localhost:8000/api/token/refresh/', { refresh: refreshToken }).pipe(
         tap(newToken => {
           // Save the new access token to localStorage
           localStorage.setItem('access_token', newToken.access);
           // Optionally, log the new token or perform other actions
           console.log('Access token refreshed:', newToken.access);
         }),
         catchError(error => {
           // Handle errors, such as when the refresh token is also invalid or expired
           console.error('Error refreshing token:', error);
           // Optionally, navigate the user to the login page or show an error message
           return throwError('Error refreshing token');
         })
       );
    } else {
       // Handle the case where there is no refresh token available
       console.error('No refresh token available.');
       // Optionally, navigate the user to the login page or show an error message
       return throwError('No refresh token available.');
    }
   }

  // saveToken(token: any) {
  //   localStorage.setItem('access_token', token.access);
  //   localStorage.setItem('refresh_token', token.refresh);
  // }

  // signup(user: any): Observable<any> {
  //   const signupUrl = 'http://localhost:8000/api/signup/';
  //   return this.http.post<any>(signupUrl, user);
  // }

  signup(user: any): Observable<any> {
    const signupUrl = 'http://localhost:8000/api/signup/';
    return this.http.post<any>(signupUrl, user).pipe(
      tap(response => {
        // Assuming the signup endpoint also returns tokens upon successful registration
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
      })
    );
   }
}
