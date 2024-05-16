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
        return '<i class="fa-solid fa-mars" style="color: blue"></i>';
      case 'F':
        return '<i class="fa-solid fa-venus" style="color: pink"></i>';
      case 'O':
        return '<i class="fa-solid fa-venus-mars"></i>';
      default:
        return 'Unknown';
    }
  };
  detailsRenderer = (params:any) => {
    const data = params.data;
    return `
      <div>
        <div>${this.genderRenderer({ value: data.gender })}
        ${data.first_name} ${data.last_name}</div>
        <div><i class="fa-solid fa-envelope"></i> ${data.user?.email}</div>
        <div><i class="fa-solid fa-phone"></i> ${data.phone_number}</div>
      </div>
    `;
  };

  colDefs = [
    {
      headerName: 'Student Details',
      field: 'details',
      cellRenderer: this.detailsRenderer,
      autoHeight: true,
      valueGetter: (params: any) => {
        const data = params.data;
        return `${data.gender} ${data.first_name} ${data.last_name} ${data.user?.email} ${data.phone_number}`;
      },
      filter: 'agTextColumnFilter',


    },
    
    { headerName: 'First Name', field: 'first_name', filter: true, hide: true },
    { headerName: 'Last Name', field: 'last_name', filter: true, hide: true  },
    { headerName: 'Email', field: 'user.email', filter: true, hide: true  },
    { headerName: 'Gender', field: 'gender', cellRenderer: this.genderRenderer, filter: true, hide: true  },
    { headerName: 'Phone Number', field: 'phone_number', filter: true, hide: true  },
    { headerName: 'Username', field: 'user.username', filter: true },
    { headerName: 'Date of Birth', field: 'date_of_birth', filter: true },
    { headerName: 'Registration Number', field: 'registration_number', filter: true },
    { headerName: 'Admission Date', field: 'admission_date', filter: true },
    { headerName: 'Address', field: 'address_line1', filter: true },
    { headerName: 'Address', field: 'address_line2', filter: true },
    { headerName: 'City', field: 'city', filter: true },
    { headerName: 'State', field: 'state', filter: true },
    { headerName: 'Postal Code', field: 'postal_code', filter: true },
    { headerName: 'Country', field: 'country', filter: true },
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
