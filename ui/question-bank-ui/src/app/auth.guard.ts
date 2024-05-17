// Import necessary modules
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { PermissionsService } from './services/permissions.service';

// Define the functional guard
export function AuthGuard(
 route: ActivatedRouteSnapshot,
 state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 const token = localStorage.getItem('access_token');
 const router = inject(Router);
 const permissionsService = inject(PermissionsService);
 if (token) {
   //  if(!permissionsService.hasViewQuestionPermission()){
   //    router.navigate(['/']);  
   //  }
    return true;
 } else {
    router.navigate(['/login']); // Redirect to login page
    return false;
 }
}