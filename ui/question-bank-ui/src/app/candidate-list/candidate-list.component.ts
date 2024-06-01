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
  styleUrl: './candidate-list.component.css'
})
export class CandidateListComponent implements OnInit {
  colDefs: ColDef[] = [
    { headerName: 'Name', field: 'name', maxWidth: 200, filter: true },
    { headerName: 'Email', field: 'email', maxWidth: 200, filter: true },
    { headerName: 'Phone Number', field: 'phone_number', maxWidth: 200, filter: true },
    { headerName: 'Date of Birth', field: 'date_of_birth', filter: true, maxWidth: 200 },
    {
      headerName: 'Parents Name',
      field: 'parents_name',
      filter: true,
      maxWidth: 200,
    },
    {
      headerName: 'Parents Phone Number',
      field: 'parents_phone_number',
      filter: true,
      maxWidth: 200,
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
      valueGetter: this.addressValueGetter,
      maxWidth: 500,
      tooltipValueGetter: this.addressValueGetter,
    
    },
    // {
    //   headerName: 'Address',
    //   field: 'address',
    //   filter: true,
    //   maxWidth: 200,
    // },
    // {
    //   headerName: 'City',
    //   field: 'city',
    //   filter: true,
    //   maxWidth: 200,
    // },
    // {
    //   headerName: 'State',
    //   field: 'state',
    //   filter: true,
    //   maxWidth: 200,
    // },
  ];
  
  autoSizeStrategy: any;

  rowData: any[] = [];

  constructor(
    private candidateService: CandidatesService,
    
  ) {
    this.autoSizeStrategy = {
      type: 'fitCellContents',
  };
  }

  ngOnInit(): void {
    this.loadCandidates();
  }

  loadCandidates(): void {
    this.candidateService.getCandidates().subscribe(data => {
      this.rowData = data;
    });
  }

  addressValueGetter(params: any) {
    const data = params.data;
    return `${data.address}, ${data.city}, ${data.state}, ${data.postal_code}, ${data.country}`;
  }
  // delete(e: any) {
  //   this.deleteEntranceTest(e.data.id);
  // }
 
  // deleteEntranceTest(entranceTestId: number): void {
  //   if (confirm('Are you sure you want to delete this question?')) {
  //     this.candidateService.deleteCandidate(entranceTestId).subscribe({
  //       next: (response) => {
  //         console.log('Question Paper deleted:', response);
  //         this.loadCandidates();
  //       },
  //       error: (error) => {
  //         console.error('Error deleting entrance test', error);
  //       },
  //     });
  //   }
  // }

}
