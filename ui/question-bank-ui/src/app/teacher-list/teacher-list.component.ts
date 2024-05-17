import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { PermissionsService } from '../services/permissions.service';
import { Router } from '@angular/router';
import { DeleteButtonRendererComponent } from '../delete-button/delete-button.component';
import { ViewButtonRendererComponent } from '../view-button/view-button.component';
import { UpdateButtonRendererComponent } from '../update-button/update-button.component';
import { AgGridAngular } from 'ag-grid-angular';
import { TeacherRegistrationComponent } from '../teacher-registration/teacher-registration.component';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent implements OnInit {
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

  teacherDetailsRenderer = (params: any) => {
    const data = params.data;
    return `
      <div>
        <div>${this.genderRenderer({ value: data.gender })}
        ${data.first_name} ${data.middle_name} ${data.last_name}</div>
        
      </div>
    `;
  };
  
  colDefs = [
    {
      headerName: 'ID',
      field: 'id',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
      
    },
    {
      headerName: 'Teacher Details',
      field: 'details',
      cellRenderer: this.teacherDetailsRenderer,
      autoHeight: true,
      valueGetter: (params: any) => {
        const data = params.data;
        return `${data.gender} ${data.first_name} ${data.middle_name} ${data.last_name}`;
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
      headerName: 'Middle Name',
      field: 'middle_name',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
      hide: true,

    },
    {
      headerName: 'Phone Number',
      field: 'phone_number',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
    },
    {
      headerName: 'Email',
      field: 'user.email',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
    },
    {
      headerName: 'Alternate Phone Number',
      field: 'alternate_phone_number',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
      hide: true,
    },
    { headerName: 'Username', field: 'user.username', filter: true,
    maxWidth: 200,
    autoSizeColumnsToFitContent: true,
     },

    {
      headerName: 'Date of Birth',
      field: 'date_of_birth',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
      valueFormatter: this.dateFormatter,

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
      headerName: 'Designation',
      field: 'designation',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
    },
    {
      headerName: 'Department',
      field: 'department',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
    },
    {
      headerName: 'Joining Date',
      field: 'joining_date',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
      valueFormatter: this.dateFormatter,

    },
    {
      headerName: 'Address',
      field: 'address',
      filter: true,
      maxWidth: 500,
      valueGetter: this.addressValueGetter,
      tooltipValueGetter: this.addressValueGetter,
    },
    {
      headerName: 'City',
      field: 'city',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
      hide: true,

    },
    {
      headerName: 'State',
      field: 'state',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
      hide: true,

    },
    {
      headerName: 'Postal Code',
      field: 'postal_code',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
      hide: true,

    },
    {
      headerName: 'Country',
      field: 'country',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
      hide: true,

    },
    {
      headerName: 'Profile Picture',
      field: 'profile_picture',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
      hide: true,
    },
    {
      headerName: 'Biography',
      field: 'biography',
      filter: true,
      maxWidth: 200,
      autoSizeColumnsToFitContent: true,
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
    private teacherService: TeacherService,
    private matDialog: MatDialog,
    public permissionsService: PermissionsService,
    private router: Router,
  ) {
    this.autoSizeStrategy = {
      type: 'fitCellContents',
    };
  }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe((data) => {
      this.rowData = data;
    });
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
        this.loadTeachers();
      }
    });
  }

  view(e: any) {
    console.log('view clicked');
    this.router.navigate(['/teacher-view', e.data.id]);
  }

  update(e: any) {
    console.log('update clicked');
    this.openTeacherRegistrationModal(e.data.id);
  }

  delete(e: any) {
    console.log('delete clicked');
    this.deleteTeacher(e.data.id);
  }

  deleteTeacher(teacherId: number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.deleteTeacher(teacherId).subscribe({
        next: (response) => {
          console.log('Teacher deleted:', response);
          this.loadTeachers();
        },
        error: (error) => {
          console.error('Error deleting teacher', error);
        },
      });
    }
  }

  addressValueGetter(params: any) {
    const data = params.data;
    return `${data.address_line1}, ${data.address_line2}, ${data.city}, ${data.state}, ${data.postal_code}, ${data.country}`;
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
}