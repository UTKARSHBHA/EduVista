import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherService } from '../services/teacher.service';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Optional } from 'ag-grid-community';

@Component({
  selector: 'app-teacher-registration',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatDialogModule],
  templateUrl: './teacher-registration.component.html',
  styleUrl: './teacher-registration.component.css'
})
export class TeacherRegistrationComponent  implements OnInit {
  registrationForm: FormGroup;
  teacherId: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private teacherService : TeacherService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef: MatDialogRef<any>,

  ) {
    this.registrationForm = this.formBuilder.group({
      user: this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
      }, { validators: this.checkPasswords }),

      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      middle_name: [''],
      phone_number: ['', Validators.required],
      alternate_phone_number: [''],
      date_of_birth: ['', Validators.required],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      joining_date: ['', Validators.required],
      // Address fields
      address_line1: ['', Validators.required],
      address_line2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['', Validators.required],
      // Profile picture (handle as File type)
      profile_picture: [null],
      // Biography
      biography: ['']
    });
  }

  ngOnInit(): void {
    // this.teacherId = this.route.snapshot.paramMap.get('id');
    console.log('data' , this.data)
    this.teacherId = this.data.id;


    if (this.teacherId) {
      this.registrationForm.removeControl('user');
      // this.registrationForm.removeControl('confirmPassword');

      this.teacherService
        .getTeacherById(+this.teacherId)
        .subscribe((teacher) => {
          console.log(teacher);

          this.registrationForm.patchValue(teacher);

          console.log(teacher);
          // Assuming you have a method to set the options form array based on the teacher's options
        });
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      if (this.teacherId) {
        // console.log(formData);
        this.teacherService
          .updateTeacher(this.teacherId, this.registrationForm.value)
          .subscribe({
            next: (data) => {
              console.log('Question updated:', data);
              // this.loadQuestions();
              this.registrationForm.reset(); // Reset the form
              alert('Successfully updated the teacher');
              this.dialogRef?.close({ refresh: true})

              // this.router.navigate(['/teacher-registration']);
            },
            error: (error) => {
              console.error('Error updating teacher', error);
            },
          });
      } else {
        this.teacherService
          .registerTeacher(this.registrationForm.value)
          .subscribe(
            (response) => {
              alert('Teacher registered successfully');
              this.registrationForm.reset();
              this.dialogRef?.close({ refresh: true})

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
