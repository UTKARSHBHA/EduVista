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
    const excludedEndpoints = ['/api/login', '/api/signup'];

    // Check if the request is for an excluded endpoint
    if (!excludedEndpoints.some(endpoint => req.url.includes(endpoint))) {
      const token = localStorage.getItem('access_token');
      if (token) {
        // Clone the request to add the Authorization header
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });

        // Attempt the request
        return next.handle(cloned).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              // If the request returns a 401 error, attempt to refresh the token
              return this.authService.refreshToken().pipe(
                switchMap((newToken: any) => {
                 // Retry the request with the new token
                 const retryCloned = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${newToken.access}`
                    }
                 });
                 return next.handle(retryCloned);
                }),
                catchError((refreshError) => {
                 // Handle errors from the token refresh attempt
                 console.error('Error refreshing token:', refreshError);
                 // Optionally, navigate the user to the login page or show an error message
                 return throwError('Error refreshing token');
                })
              );
            } else {
              // If the error is not a 401, rethrow the error
              return throwError(error);
            }
          })
        );
      }
    }

    // If the request is for an excluded endpoint or there is no token, proceed as normal
    return next.handle(req);
 }
}
