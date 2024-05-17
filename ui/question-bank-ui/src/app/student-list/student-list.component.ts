import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { StudentRegistrationService } from '../services/student-registration.service';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { StudentRegistrationComponent } from '../student-registration/student-registration.component';
import { PermissionsService } from '../services/permissions.service';
import { WidthType } from 'docx';
import { HighContrastModeDetector } from '@angular/cdk/a11y';
import { ViewButtonRendererComponent } from '../view-button/view-button.component';
import { Router } from '@angular/router';
import { DeleteButtonRendererComponent } from '../delete-button/delete-button.component';
import { UpdateButtonRendererComponent } from '../update-button/update-button.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent implements OnInit {
  rowData: any[] = [];

  genderRenderer = (params: any) => {
    switch (params.value) {
      case 'M':
        return '<i class="fa-solid fa-mars" style="color: blue; margin-right: 5px;"></i>';
      case 'F':
        return '<i class="fa-solid fa-venus" style="color: pink ;margin-right: 5px;"></i>';
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
        return `${data.gender} ${data.first_name} ${data.last_name}`;
      },
      filter: 'agTextColumnFilter',
    },

    {
      headerName: 'First Name',
      field: 'first_name',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
      hide: true,
    },
    {
      headerName: 'Last Name',
      field: 'last_name',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
      hide: true,
    },
    {
      headerName: 'Email',
      field: 'user.email',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
    },
    {
      headerName: 'Gender',
      field: 'gender',
      cellRenderer: this.genderRenderer,
      filter: true,
      maxWidth: 200,
      hide: true,
    },
    {
      headerName: 'Phone Number',
      field: 'phone_number',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
    },
    { headerName: 'Username', field: 'user.username', filter: true },
    {
      headerName: 'Date of Birth',
      field: 'date_of_birth',
      filter: true,
      maxWidth: 200,
      valueFormatter: this.dateFormatter,
    },
    {
      headerName: 'Registration Number',
      field: 'registration_number',
      filter: true,
      maxWidth: 200,
    },
    {
      headerName: 'Admission Date',
      field: 'admission_date',
      filter: true,
      maxWidth: 200,
      valueFormatter: this.dateFormatter,
      tooltipField: "admission_date",
    },
    {
      headerName: 'Address',
      field: 'address',
      filter: true,
      valueGetter: this.addressValueGetter,
      maxWidth: 500,
      tooltipValueGetter: this.addressValueGetter,
    
    },

    {
      headerName: 'Address',
      field: 'address_line1',
      filter: true,
      maxWidth: 200,
      hide: true,
    },
    {
      headerName: 'Address',
      field: 'address_line2',
      filter: true,
      maxWidth: 200,
      hide: true,
    },
    {
      headerName: 'City',
      field: 'city',
      filter: true,
      maxWidth: 200,
      hide: true,
    },
    {
      headerName: 'State',
      field: 'state',
      filter: true,
      maxWidth: 200,
      hide: true,
    },
    {
      headerName: 'Postal Code',
      field: 'postal_code',
      filter: true,
      maxWidth: 200,
      hide: true,
    },
    {
      headerName: 'Country',
      field: 'country',
      filter: true,
      maxWidth: 200,
      hide: true,
    },
    {
      headerName: 'Parent/Guardian Name',
      field: 'parent_guardian_name',
      filter: true,
      maxWidth: 200,
      hide: true,
    },
    {
      headerName: 'Parent/Guardian Contact',
      field: 'parent_guardian_contact',
      filter: true,
      maxWidth: 200,
      hide: true,
    },
    {
      headerName: 'Parent/Guardian Email',
      field: 'parent_guardian_email',
      filter: true,
      maxWidth: 200,
      hide: true,
    },
    {
      headerName: 'Emergency Contact Name',
      field: 'emergency_contact_name',
      filter: true,
      maxWidth: 200,
      hide: true,
    },
    {
      headerName: 'Emergency Contact Number',
      field: 'emergency_contact_number',
      filter: true,
      maxWidth: 200,
      hide: true,
    },
    {
      headerName: 'Parent/Guardian Details',
      field: 'parentDetails',
      cellRenderer: this.parentDetailsRenderer,
      autoHeight: true,
      filter: 'agTextColumnFilter',
      valueGetter: (params: any) => {
        const data = params.data;
        return `${data.parent_guardian_name} ${data.parent_guardian_email} ${data.parent_guardian_contact}`;
      },
      hide: true,
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
      },
      hide: true,
    },
    {
      field: 'Delete',
      cellRenderer: DeleteButtonRendererComponent,
      onCellClicked: this.delete.bind(this),
      maxWidth: 100,
      hide: !this.permissionsService.getPermissions('Questions.delete_student'),
    },
    {
      field: 'View',
      cellRenderer: ViewButtonRendererComponent,
      onCellClicked: this.view.bind(this),
      maxWidth: 100,
      hide: !this.permissionsService.getPermissions('Questions.view_student'),
    },
    {
      field: 'Update',
      cellRenderer: UpdateButtonRendererComponent,
      onCellClicked: this.update.bind(this),
      maxWidth: 100,
      hide: !this.permissionsService.getPermissions('Questions.change_student'),
    },
  ];
  autoSizeStrategy: any;

  constructor(
    private studentRegistrationService: StudentRegistrationService,
    private matDialog: MatDialog,
    public permissionsService: PermissionsService,
    private router: Router
  ) {
    this.autoSizeStrategy = {
      type: 'fitCellContents',
    };
  }

  ngOnInit(): void {
    this.loadStudents();
    this.studentRegistrationService.getStudents().subscribe((data) => {
      this.rowData = data;
    });
  }

  loadStudents(): void {
    this.studentRegistrationService.getStudents().subscribe((data) => {
      console.log(data);
      this.rowData = data.results;
    });
  }

  // Inside student-list.component.ts

  openStudentRegistrationModal(id: any) {
    const dialogRef = this.matDialog.open(StudentRegistrationComponent, {
      height: '90vh',
      width: '90vw',
      disableClose: true,
      data: { id },
    });
  }
  dateFormatter(params: any) {
    if (params.value) {
      const date = new Date(params.value);
      return `${('0' + date.getDate()).slice(-2)} ${date.toLocaleString(
        'default',
        { month: 'short' }
      )} ${date.getFullYear()}`;
    }
    return '';
  }
  addressValueGetter(params: any) {
    const data = params.data;
    return `${data.address_line1}, ${data.address_line2}, ${data.city}, ${data.state}, ${data.postal_code}, ${data.country}`;
  }
  view(e: any) {
    console.log('veiw clicked');
    this.router.navigate(['/student-view', e.data.id]);
    // this.openStudentRegistrationModal(e.data.id);
  }
  update(e: any) {
    console.log('update clicked');
    // this.router.navigate(['/student-view', e.data.id]);
    this.openStudentRegistrationModal(e.data.id);
  }

  delete(e: any) {
    this.deleteStudent(e.data.id);
  }
  deleteStudent(studentId: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentRegistrationService.deleteStudent(studentId).subscribe({
        next: (response) => {
          console.log('Student deleted:', response);
          this.loadStudents();
        },
        error: (error) => {
          console.error('Error deleting student', error);
        },
      });
    }
  }
}
