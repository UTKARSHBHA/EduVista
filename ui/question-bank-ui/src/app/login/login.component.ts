import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
 errorMessage: string = '';

 constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
 }

 loginUser() {
   console.log(" nodt valid");
    if (this.loginForm.valid) {
      console.log("valid");
      const userData = this.loginForm.value;
      this.authService.login(userData.username, userData.password)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/questions-list']); // Navigate to home route after successful login
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Invalid username or password. Please try again.';
          this.loginForm.reset();
        }
      });
    } else {
      console.error('Form is invalid');
    }
 }
}