import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { StudentRegistrationService } from '../services/student-registration.service';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { StudentRegistrationComponent } from '../student-registration/student-registration.component';
import { PermissionsService } from '../service/permissions.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  rowData: any[] = [];

  genderRenderer = (params:any) => {
    switch (params.value) {
      case 'M':
        return 'Male';
      case 'F':
        return 'Female';
      case 'O':
        return 'Others';
      default:
        return 'Unknown';
    }
  };

  colDefs = [
    { headerName: 'First Name', field: 'first_name', filter: true },
    { headerName: 'Last Name', field: 'last_name', filter: true },
    { headerName: 'Email', field: 'user.email', filter: true },
    { headerName: 'Username', field: 'user.username', filter: true },
    { headerName: 'Phone Number', field: 'phone_number', filter: true },
    { headerName: 'Date of Birth', field: 'date_of_birth', filter: true },
    { headerName: 'Gender', field: 'gender', cellRenderer: this.genderRenderer, filter: true },
    { headerName: 'Registration Number', field: 'registration_number', filter: true },
    { headerName: 'Admission Date', field: 'admission_date', filter: true },
    { headerName: 'Address', field: 'address_line1', filter: true },
    { headerName: 'Address', field: 'address_line2', filter: true },
    { headerName: 'City', field: 'city', filter: true },
    { headerName: 'State', field: 'state', filter: true },
    { headerName: 'Postal Code', field: 'postal_code', filter: true },
    { headerName: 'Country', field: 'country', filter: true },
    // { headerName: 'Profile Picture', field: 'profile_picture', cellRenderer: 'agGridImageRenderer', filter: true },
    { headerName: 'Parent/Guardian Name', field: 'parent_guardian_name', filter: true },
    { headerName: 'Parent/Guardian Contact', field: 'parent_guardian_contact', filter: true },
    { headerName: 'Emergency Contact Name', field: 'emergency_contact_name', filter: true },
    { headerName: 'Emergency Contact Number', field: 'emergency_contact_number', filter: true },
  ];

  constructor(private studentRegistrationService: StudentRegistrationService, 
    private matDialog: MatDialog,
    public permissionsService: PermissionsService,

  ) {
    
  }

  ngOnInit(): void {
    this.loadStudents();
    this.studentRegistrationService.getStudents().subscribe(data => {
      this.rowData = data;
    });
  }

  loadStudents(): void {
    this.studentRegistrationService
      .getStudents()
      .subscribe((data) => {
        console.log(data);
        this.rowData = data.results;
      });
    
  }

  // Inside student-list.component.ts

  
  openStudentRegistrationModal() {
    const dialogRef = this.matDialog.open(StudentRegistrationComponent, {
      height: '90vh',
      width: '90vw',
      disableClose: true,
    });
  }
};
