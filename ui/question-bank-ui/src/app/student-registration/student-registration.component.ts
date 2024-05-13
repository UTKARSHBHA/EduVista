import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentRegistrationService } from '../services/student-registration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css'
})
export class StudentRegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private studentRegistrationService: StudentRegistrationService) {
    this.registrationForm = this.formBuilder.group({
      user: this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      }),
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      middle_name: [''],
      phone_number: ['', Validators.required],
      alternate_phone_number: [''],
      date_of_birth: ['', Validators.required],
      gender: ['', Validators.required],
      // registration_number: [''],
      admission_date: [''],
      // Address fields
      address_line1: ['', Validators.required],
      address_line2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['', Validators.required],
      // Profile picture (handle as File type)
      profile_picture: [null],
      // Parent/Guardian fields
      parent_guardian_name: ['', Validators.required],
      parent_guardian_contact: ['', Validators.required],
      // Emergency contact
      emergency_contact_name: ['', Validators.required],
      emergency_contact_number: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.studentRegistrationService.registerStudent(this.registrationForm.value)
       .subscribe(
          (response) => {
            alert("Student registered successfully");
          },
          (error) => {
            console.error(error);
          })
    }
  }
}