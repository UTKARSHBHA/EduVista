import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule , FormsModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  errorMessage: string = '';
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
     this.changePasswordForm = this.formBuilder.group({
       oldPassword: ['', Validators.required],
       newPassword: ['', Validators.required],
       confirmPassword: ['', Validators.required],
     }, { validator: this.checkPasswords });
  }
 
  onSubmit() {
    if (this.changePasswordForm.valid) {
        const { oldPassword, newPassword } = this.changePasswordForm.value;
        this.authService.changePassword(oldPassword, newPassword).subscribe({
            next: (response) => {
                console.log(response);
                this.errorMessage = 'Password has been changed.';
                alert("Password has been changed.")
                this.router.navigate(['/']);

            },
            error: (error) => {
                console.error(error);
                // Extract the error message from the server response
                if (error.error && error.error.error) {
                    this.errorMessage = error.error.error;
                } else {
                    this.errorMessage = 'An error occurred. Please try again.';
                }
            }
        });
    } else {
        console.error('Form is invalid');
    }
}
 
  checkPasswords(group: FormGroup) {
    let pass = group.controls['newPassword'].value;
    let confirmPass = group.controls['confirmPassword'].value;
 
    return pass === confirmPass ? null : { notSame: true };
  }
 }