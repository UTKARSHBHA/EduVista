import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
  username: string = '';
  errorMessage: string = ''; // Declare the errorMessage property

 
  constructor(private http: HttpClient, private authService : AuthService) {}
 
  onSubmit() {
    this.authService.resetPassword(this.username).subscribe({
       next: (response) => {
         // Handle successful password reset request
         console.log(response);
         this.errorMessage = 'Password reset username sent. Please check your inbox.';
       },
       error: (error) => {
         // Handle error
         console.error(error);
         this.errorMessage = 'An error occurred. Please try again.';
       }
    });
   }
 }