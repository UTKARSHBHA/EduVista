import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = ''; // Add this line to store the error message

 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, this.uniqueUsernameValidator()]],
      email: ['', [Validators.required, Validators.email]], // Add this line
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
  }, { validator: this.checkPasswords });
  }
 
  signupUser() {
    if (this.signupForm.valid) {
       const userData = this.signupForm.value;
       this.authService.signup(userData).subscribe({
         next: (res) => {
           console.log(res);
           this.router.navigate(['/login']); // Navigate to login route
         },
         error: (err) => {
           console.error(err);
           if (err.error && err.error.username) {
             this.errorMessage = err.error.username[0]; // Assuming the error message is the first item in the array
           } else {
             this.errorMessage = 'An error occurred. Please try again.';
           }
           this.signupForm.reset();
         }
       });
    } else {
       console.error('Form is invalid');
    }
   }
 
 checkPasswords(group: FormGroup) {
  let pass = group.controls['password'].value;
  let confirmPass = group.controls['confirmPassword'].value;

  // Remove the mismatch error if it exists
  if (group.controls['confirmPassword'].errors?.['mismatch']) {
    group.controls['confirmPassword'].setErrors(null);
  }

  // Check if the passwords match
  if (pass !== confirmPass) {
    // Set the mismatch error on the confirmPassword form control
    group.controls['confirmPassword'].setErrors({ mismatch: true });
  }

  // Return null if there are no errors
  return null;
}

 
  uniqueUsernameValidator(): ValidatorFn {
     return (control: AbstractControl): { [key: string]: any } | null => {
       // Implement your logic to check if the username is unique
       // This could involve making an HTTP request to your backend
       // For demonstration, we'll assume the username is unique if it's not 'admin'
       const isUnique = control.value !== 'admin';
       return isUnique ? null : { unique: true };
     };
  }
 }