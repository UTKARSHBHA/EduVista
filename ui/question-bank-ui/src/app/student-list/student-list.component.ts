import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { StudentRegistrationService } from '../services/student-registration.service';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { StudentRegistrationComponent } from '../student-registration/student-registration.component';
import { PermissionsService } from '../service/permissions.service';
import { DatePipe } from '@angular/common';
import { WidthType } from 'docx';

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
        return '<i class="fa-solid fa-mars" style="color: blue margin-right: 5px;"></i>';
      case 'F':
        return '<i class="fa-solid fa-venus" style="color: pink margin-right: 5px;"></i>';
      case 'O':
        return '<i class="fa-solid fa-venus-mars " style="margin-right: 5px;"></i>';
      default:
        return 'Unknown';
    }
  };
  studentDetailsRenderer = (params: any) => {
    const data = params.data;
    return `
      <div>
        <div>${this.genderRenderer({ value: data.gender })}
        ${data.first_name} ${data.last_name}</div>
        <div><a  style="color: inherit" href="mailto:${data.user?.email}"><i class="fa-solid fa-envelope"  style="margin-right: 5px;"></i> ${data.user?.email}</a></div>
        <div><i class="fa-solid fa-phone"  style="margin-right: 5px;"></i> ${data.phone_number}</div>
      </div>
    `;
  };
  parentDetailsRenderer = (params: any) => {
    const data = params.data;
    return `
      <div>
        <div>${data.parent_guardian_name}</div>
        <div><a  style="color: inherit" href="mailto:${data.parent_guardian_email}"><i class="fa-solid fa-envelope"  style="margin-right: 5px;"></i> ${data.parent_guardian_email}</a></div>
        <div><i class="fa-solid fa-phone"  style="margin-right: 5px;"></i> ${data.parent_guardian_contact}</div>
      </div>
    `;
  };

  emergencyDetailsRenderer = (params: any) => {
    const data = params.data;
    return `
      <div>
        <div>${data.emergency_contact_name}</div>
        <div><i class="fa-solid fa-phone"  style="margin-right: 5px;"></i> ${data.emergency_contact_number}</div>
      </div>
    `;
  };
  

  colDefs = [
    {
      headerName: 'Student Details',
      field: 'details',
      cellRenderer: this.studentDetailsRenderer,
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
    { headerName: 'Date of Birth', field: 'date_of_birth', filter: true, valueFormatter: this.dateFormatter, },
    { headerName: 'Registration Number', field: 'registration_number', filter: true },
    { headerName: 'Admission Date', field: 'admission_date', filter: true, valueFormatter: this.dateFormatter, },
    { headerName: 'Address', field: 'address', filter: true, valueGetter: this.addressValueGetter, width : 400 },

    { headerName: 'Address', field: 'address_line1', filter: true, hide: true },
    { headerName: 'Address', field: 'address_line2', filter: true, hide: true },
    { headerName: 'City', field: 'city', filter: true, hide: true },
    { headerName: 'State', field: 'state', filter: true, hide: true },
    { headerName: 'Postal Code', field: 'postal_code', filter: true, hide: true },
    { headerName: 'Country', field: 'country', filter: true, hide: true },
    { headerName: 'Parent/Guardian Name', field: 'parent_guardian_name', filter: true, hide: true },
    { headerName: 'Parent/Guardian Contact', field: 'parent_guardian_contact', filter: true, hide: true },
    { headerName: 'Parent/Guardian Email', field: 'parent_guardian_email', filter: true, hide: true },
    { headerName: 'Emergency Contact Name', field: 'emergency_contact_name', filter: true, hide: true },
    { headerName: 'Emergency Contact Number', field: 'emergency_contact_number', filter: true, hide: true },
    {
      headerName: 'Parent/Guardian Details',
      field: 'parentDetails',
      cellRenderer: this.parentDetailsRenderer,
      autoHeight: true,
      filter: 'agTextColumnFilter',
      valueGetter: (params: any) => {
        const data = params.data;
        return `${data.parent_guardian_name} ${data.parent_guardian_email} ${data.parent_guardian_contact}`;
      }
    },
    {
      headerName: 'Emergency Contact Details',
      field: 'emergencyDetails',
      cellRenderer: this.emergencyDetailsRenderer,
      autoHeight: true,
      filter: 'agTextColumnFilter',
      valueGetter: (params: any) => {
        const data = params.data;
        return `${data.emergency_contact_name} ${data.emergency_contact_number}`;
      }
    },
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
  dateFormatter(params: any) {
    if (params.value) {
      const date = new Date(params.value);
      return `${('0' + date.getDate()).slice(-2)} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    }
    return '';
  }
  addressValueGetter(params: any) {
    const data = params.data;
    return `${data.address_line1}, ${data.address_line2}, ${data.city}, ${data.state}, ${data.postal_code}, ${data.country}`;
  }
};
