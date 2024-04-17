import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
     this.signupForm = this.formBuilder.group({
       username: ['', Validators.required],
       password: ['', Validators.required]
     });
  }
 
  signupUser() {
     if (this.signupForm.valid) {
       const userData = this.signupForm.value;
       this.authService.signup(userData).subscribe({
         next: (res) => {
           console.log(res);
           // Optionally, navigate to the login page or show a success message
         },
         error: (err) => {
           console.error(err);
           // Handle signup errors, e.g., show an error message to the user
         }
       });
     } else {
       // Optionally, handle form validation errors
       console.error('Form is invalid');
     }
  }
 }