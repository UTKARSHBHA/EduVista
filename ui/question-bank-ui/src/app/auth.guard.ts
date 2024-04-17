// Import necessary modules
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

// Define the functional guard
export function AuthGuard(
 route: ActivatedRouteSnapshot,
 state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 const token = localStorage.getItem('access_token');
 const router = inject(Router);
 if (token) {
    return true;
 } else {
    router.navigate(['/login']); // Redirect to login page
    return false;
 }
}