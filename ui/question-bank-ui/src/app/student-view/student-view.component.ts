import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentRegistrationService } from '../services/student-registration.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { StudentRegistrationComponent } from '../student-registration/student-registration.component';

@Component({
  selector: 'app-student-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-view.component.html',
  styleUrl: './student-view.component.css',
})
export class StudentViewComponent implements OnInit {
  student: any = [];

  constructor(
    private route: ActivatedRoute,
    private studentRegistrationService: StudentRegistrationService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.studentRegistrationService
        .getStudentById(+studentId)
        .subscribe((student) => {
          this.student = student;
          console.log(this.student);
        });
    } else {
      console.error('Student ID is null');
      this.router.navigate(['/student-list']);
    }
  }

  deleteStudent(): void {
    if (
      this.student &&
      confirm('Are you sure you want to delete this student?')
    ) {
      this.studentRegistrationService.deleteStudent(this.student.id).subscribe({
        next: () => {
          console.log('Student deleted successfully');
          this.router.navigate(['/student-list']); // Navigate to the student list
        },
        error: (error) => {
          console.error('Error deleting student', error);
        },
      });
    }
  }

  updateStudent(): void {
    // this.router.navigate(['/student-registration', this.student.id]);
    this.openStudentRegistrationModal(this.student.id);
  }

  openStudentRegistrationModal(id: any) {
    const dialogRef = this.matDialog.open(StudentRegistrationComponent, {
      height: '90vh',
      width: '90vw',
      disableClose: true,
      data: { id },
    });
  }
}
