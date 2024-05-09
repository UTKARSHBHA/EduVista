// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { log } from 'console';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/api/token/';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private cookieService: CookieService
  ) {}

  isTokenExpired(): boolean {
    const token = localStorage.getItem('access_token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  login(credentials: any): Observable<any> {
    return this.http
      .post<any>('http://localhost:8000/api/token/', credentials)
      .pipe(
        tap((response) => {
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
    console.log(refreshToken);
    if (refreshToken) {
      console.log('inside if of refresh token');

      return this.http
        .post<any>('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken,
        })
        .pipe(
          tap((newToken) => {
            // Save the new access token to localStorage
            console.log('refesh token request done');
            localStorage.setItem('access_token', newToken.access);
            console.log('Access token refreshed:', newToken.access);
          }),
          catchError((error) => {
            console.error('Error refreshing token:', error);
            return throwError('Error refreshing token');
          })
        );
    } else {
      console.error('No refresh token available.');
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
      tap((response) => {
        // Assuming the signup endpoint also returns tokens upon successful registration
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
      })
    );
  }

  // auth.service.ts

  getCsrfToken(): string {
    return this.cookieService.get('csrftoken');
  }

  resetPassword(username: string) {
    const url = 'http://localhost:8000/api/password_reset/';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ username: username });

    return this.http.post(url, body, { headers: headers });
  }

  // src/app/services/auth.service.ts
  confirmPasswordReset(token: string, newPassword: string) {
    const url = `http://localhost:8000/api/password_reset_confirm/${token}/`;
    return this.http.post(url, { new_password: newPassword });
  }

  changePassword(oldPassword: string, newPassword: string) {
    const url = 'http://localhost:8000/api/change_password/';
    return this.http.post(url, { old_password: oldPassword, new_password: newPassword });
   }

  //  decodeToken(){
  //   const token = localStorage.getItem('access_token');
  //   if(token){
  //     try {
  //       const decodedToken = this.jwtHelper.decodeToken(token);
  //       return decodedToken.permissions;
  //     } catch (error) {
  //       console.error('Error decoding JWT token:', error);
  //       return null;
  //     }
  //   }
  // }
}
