import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

 constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
 }


 loginUser() {
  if (this.loginForm.valid) {
    const userData = this.loginForm.value;
    this.authService.login(userData).subscribe(
      res => {
        console.log(res);
        this.authService.saveToken(res);
        // Optionally, navigate to a protected route or dashboard here
      },
      err => {
        console.error(err);
        // Handle login errors, e.g., show an error message to the user
      }
    );
  } else {
    // Optionally, handle form validation errors
    console.error('Form is invalid');
  }
}
}
