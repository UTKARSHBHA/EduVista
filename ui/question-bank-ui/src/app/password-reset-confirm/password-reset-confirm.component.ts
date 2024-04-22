import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterConfigOptions } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-reset-confirm',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './password-reset-confirm.component.html',
  styleUrl: './password-reset-confirm.component.css'
})
export class PasswordResetConfirmComponent implements OnInit {
  newPassword: string = '';
  errorMessage: string = '';
  token: any = '';
 
  constructor(private route: ActivatedRoute, private authService: AuthService ,private router: Router) {}
 
  ngOnInit(): void {
     this.token = this.route.snapshot.paramMap.get('token');
  }
 
  onSubmit() {
     this.authService.confirmPasswordReset(this.token, this.newPassword).subscribe(
       response => {
         console.log(response);
         alert("Password reset successfully!");
         this.router.navigate(['/login']);

         // Handle successful submission (e.g., show a success message)
       },
       error => {
         console.error(error);
         this.errorMessage = 'An error occurred. Please try again later.';
         // Handle error (e.g., show an error message)
       }
     );
  }
 }