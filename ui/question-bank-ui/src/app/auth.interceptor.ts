// src/app/auth.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Define the endpoints that should not include the Authorization header
    const excludedEndpoints = ['/api/token', '/api/signup', '/api/password_reset_confirm', '/api/password_reset'];

    // Check if the request is for an excluded endpoint
    if (!excludedEndpoints.some(endpoint => req.url.includes(endpoint))) {
      console.log( req.url);
      // Check if the token is expired or close to expiring
      if (this.authService.isTokenExpired()) {
        // Attempt to refresh the token
        return this.authService.refreshToken().pipe(
          switchMap((newToken: any) => {
            // If the token refresh is successful, clone the request to include the new token
            const cloned = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken.access}`
              }
            });
            return next.handle(cloned);
          }),
          catchError((error) => {
            // Handle errors, such as when the refresh token is also invalid or expired
            console.error('Error refreshing token:', error);
            // Optionally, navigate the user to the login page or show an error message
            return throwError('Error refreshing token');
          })
        );
      } else {
        // If the token is not expired, add it to the request header
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        return next.handle(cloned);
      }
    }

    // If the request is for an excluded endpoint, proceed as normal
    return next.handle(req);
 }
}