import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(public authService: AuthService , private router: Router) {}
 
  // isLoggedIn(): boolean {
  //    return this.authService.isLoggedIn(); // Implement this method in your AuthService
  // }
 
  login() {
     // Implement your login logic here
     this.router.navigate(['/login']);

  }
 
  logout() {
     // Implement your logout logic here
   //   this.authService.logout();
     this.router.navigate(['/']);

  }
 }
 