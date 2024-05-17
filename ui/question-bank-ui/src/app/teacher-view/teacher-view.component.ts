import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { TeacherRegistrationComponent } from '../teacher-registration/teacher-registration.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-view.component.html',
  styleUrl: './teacher-view.component.css'
})
export class TeacherViewComponent implements OnInit {
  teacher: any = [];

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    // const teacherId = this.route.snapshot.paramMap.get('id');
    // if (teacherId) {
    //   this.teacherService
    //     .getTeacherById(+teacherId)
    //     .subscribe((teacher) => {
    //       this.teacher = teacher;
    //       console.log(this.teacher);
    //     });
    // } else {
    //   console.error('Teacher ID is null');
    //   this.router.navigate(['/teacher-list']);
    // }
    this.loadTeacher();
  }

  loadTeacher(){
    const teacherId = this.route.snapshot.paramMap.get('id');
    if (teacherId) {
      this.teacherService
        .getTeacherById(+teacherId)
        .subscribe((teacher) => {
          this.teacher = teacher;
          console.log(this.teacher);
        });
    } else {
      console.error('Teacher ID is null');
      this.router.navigate(['/teacher-list']);
    }
  }

  deleteTeacher(): void {
    if (
      this.teacher &&
      confirm('Are you sure you want to delete this teacher?')
    ) {
      this.teacherService.deleteTeacher(this.teacher.id).subscribe({
        next: () => {
          console.log('Teacher deleted successfully');
          this.router.navigate(['/teacher-list']);
        },
        error: (error) => {
          console.error('Error deleting teacher', error);
        },
      });
    }
  }

  updateTeacher(): void {
    this.openTeacherRegistrationModal(this.teacher.id);
  }

  openTeacherRegistrationModal(id: any) {
    const dialogRef = this.matDialog.open(TeacherRegistrationComponent, {
      height: '90vh',
      width: '90vw',
      disableClose: true,
      data: { id },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      if(result && result.refresh){
        this.loadTeacher();
      }
    });
  }
}