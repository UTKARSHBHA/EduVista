import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = ''; // Store the error message
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
     this.loginForm = this.formBuilder.group({
       username: ['', Validators.required],
       password: ['', Validators.required]
     });
  }
 
  loginUser() {
     if (this.loginForm.valid) {
       const userData = this.loginForm.value;
       this.authService.login(userData).subscribe({
         next: (res) => {
           console.log(res);
           this.authService.saveToken(res);
           this.router.navigate(['/']); // Navigate to home route
         },
         error: (err) => {
           console.error(err);
           // Handle login errors, e.g., show an error message to the user
           this.errorMessage = 'Invalid username or password. Please try again.';
           this.loginForm.reset();
         }
       });
     } else {
       // Optionally, handle form validation errors
       console.error('Form is invalid');
     }
  }
 }