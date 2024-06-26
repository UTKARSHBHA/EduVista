import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentRegistrationService } from '../services/student-registration.service';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Optional } from 'ag-grid-community';
import { StandardsComponent } from '../standards/standards.component';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatDialogModule],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css',
})
export class StudentRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  studentId: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private studentRegistrationService: StudentRegistrationService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef: MatDialogRef<any>
  ) {
    this.registrationForm = this.formBuilder.group({
      user: this.formBuilder.group(
        {
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
          confirmPassword: ['', Validators.required],
        },
        { validators: this.checkPasswords }
      ),

      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      middle_name: [''],
      phone_number: ['', Validators.required],
      alternate_phone_number: [''],
      date_of_birth: ['', Validators.required],
      gender: ['', Validators.required],
      // registration_number: [''],
      admission_date: ['', Validators.required],
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
      parent_guardian_email: ['', Validators.required],
      // Emergency contact
      emergency_contact_name: ['', Validators.required],
      emergency_contact_number: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.studentId = this.route.snapshot.paramMap.get('id');
    console.log('data', this.data);
    this.studentId = this.data.id;

    if (this.studentId) {
      this.registrationForm.removeControl('user');
      // this.registrationForm.removeControl('confirmPassword');

      this.studentRegistrationService
        .getStudentById(+this.studentId)
        .subscribe((student) => {
          console.log(student);

          this.registrationForm.patchValue(student);

          console.log(student);
          // Assuming you have a method to set the options form array based on the student's options
        });
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.registrationForm.get('profile_picture')?.setValue(reader.result);
      };
    } else {
      this.registrationForm.get('profile_picture')?.setValue(null);
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      if (this.studentId) {
        // console.log(formData);
        this.studentRegistrationService
          .updateStudent(this.studentId, this.registrationForm.value)
          .subscribe({
            next: (data) => {
              console.log('Question updated:', data);
              // this.loadQuestions();
              this.registrationForm.reset(); // Reset the form
              alert('Successfully updated the student');
              this.dialogRef?.close({ refresh: true });

              // this.router.navigate(['/student-registration']);
            },
            error: (error) => {
              console.error('Error updating student', error);
            },
          });
      } else {
        this.studentRegistrationService
          .registerStudent(this.registrationForm.value)
          .subscribe(
            (response) => {
              alert('Student registered successfully');
              this.registrationForm.reset();
              this.dialogRef?.close({ refresh: true });
            },
            (error) => {
              console.error(error);
            }
          );
      }
    } else {
      console.log('form not valid');
      console.log(this.registrationForm);
    }
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
