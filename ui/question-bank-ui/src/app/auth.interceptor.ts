// src/app/auth.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Check if the request is for the signup endpoint
    if (!req.url.endsWith('/api/signup/')) {
      const token = localStorage.getItem('access_token');
      if (token) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(cloned);
      }
    }
    // If the request is for the signup endpoint or no token is present, proceed without adding headers
    return next.handle(req);
 }
}