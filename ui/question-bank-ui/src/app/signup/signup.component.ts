import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
 
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
     this.signupForm = this.formBuilder.group({
       username: ['', Validators.required],
       password: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]]
     });
  }
 
  signupUser() {
     if (this.signupForm.valid) {
       const userData = this.signupForm.value;
       this.http.post('http://localhost:8000/api/signup/', userData, { withCredentials: true }).subscribe({
         next: (res) => {
           console.log(res);
           this.router.navigate(['/']); // Navigate to home route after successful signup
         },
         error: (err) => {
           console.error(err);
           this.errorMessage = 'An error occurred. Please try again.';
           this.signupForm.reset();
         }
       });
     } else {
       console.error('Form is invalid');
     }
  }
 }