import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DeleteButtonRendererComponent } from '../delete-button/delete-button.component';
import { Router } from 'express';
import { PermissionsService } from '../services/permissions.service';
import { ActivatedRoute } from '@angular/router';
import { CandidatesService } from '../services/candidates.service';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css',
})
export class CandidateListComponent implements OnInit {
  candidateDetailsRenderer = (params: any) => {
    const data = params.data;
    return `
      <div>
        <div>${this.genderRenderer({ value: data.gender })}
        ${data.first_name} ${data.last_name}</div>
        
      </div>
    `;
  };
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
  parentDetailsRenderer = (params: any) => {
    const data = params.data;
    return `
      <div>
        <div>${data.parents_name }
        ${data.parents_phone_number}</div>
        
      </div>
    `;
  };

  colDefs: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id',
      filter: true,
      maxWidth: 200,
      
    },
    {
      headerName: 'Student Details',
      field: 'details',
      cellRenderer: this.candidateDetailsRenderer,
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
      maxWidth: 200,
      filter: true,
      hide: true,

    },
    {
      headerName: 'Last Name',
      field: 'last_name',
      maxWidth: 200,
      filter: true,
      hide: true,
    },
    {
      headerName: 'Middle Name',
      field: 'middle_name',
      maxWidth: 200,
      filter: true,
      hide: true,
    },
    { headerName: 'Email', field: 'email', maxWidth: 200, filter: true },
    {
      headerName: 'Phone Number',
      field: 'phone_number',
      maxWidth: 200,
      filter: true,
    },
    {
      headerName: 'Date of Birth',
      field: 'date_of_birth',
      filter: true,
      maxWidth: 200,
    },
    {
      headerName: 'Gender',
      field: 'gender',
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
        return `${data.parents_name} ${data.parents_phone_number}`;
      },
    },
    {
      headerName: 'Parents Name',
      field: 'parents_name',
      filter: true,
      maxWidth: 200,
      hide: true,

    },
    {
      headerName: 'Parents Phone Number',
      field: 'parents_phone_number',
      filter: true,
      maxWidth: 200,
      hide: true,

    },
    {
      headerName: 'Highest Qualification',
      field: 'highest_qualification',
      filter: true,
      maxWidth: 200,
    },
    {
      headerName: 'Educational Institution',
      field: 'educational_institution',
      filter: true,
      maxWidth: 200,
    },
    {
      headerName: 'Year of Completion',
      field: 'year_of_completion',
      filter: true,
      maxWidth: 200,
    },
    {
      headerName: 'Address',
      field: 'address',
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
      headerName: 'Address',
      field: 'address',
      filter: true,
      valueGetter: this.addressValueGetter,
      maxWidth: 500,
      tooltipValueGetter: this.addressValueGetter,
    
    },
    {
      field: 'Delete',
      cellRenderer: DeleteButtonRendererComponent,
      onCellClicked: this.delete.bind(this),
      maxWidth:200,
      hide: !this.permissionsService.getPermissions('Questions.delete_candidate'),

    },
  ];

  autoSizeStrategy: any;

  rowData: any[] = [];

  constructor(private candidateService: CandidatesService,
    public permissionsService: PermissionsService,


  ) {
    this.autoSizeStrategy = {
      type: 'fitCellContents',
    };
  }

  ngOnInit(): void {
    this.loadCandidates();
  }

  loadCandidates(): void {
    this.candidateService.getCandidates().subscribe((data) => {
      this.rowData = data;
    });
  }

  addressValueGetter(params: any) {
    const data = params.data;
    return `${data.address}, ${data.city}, ${data.state}, ${data.postal_code}, ${data.country}`;
  }
  delete(e: any) {
    this.deleteCandidate(e.data.id);
  }

  deleteCandidate(candidateId: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.candidateService.deleteCandidate(candidateId).subscribe({
        next: (response) => {
          console.log('Candidate deleted:', response);
          this.loadCandidates();
        },
        error: (error) => {
          console.error('Error deleting candidate', error);
        },
      });
    }
  }
}
