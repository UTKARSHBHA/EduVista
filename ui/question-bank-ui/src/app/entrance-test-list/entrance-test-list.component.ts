import { Component, OnInit } from '@angular/core';
import { EntranceTestService } from '../services/entrance-test.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { DeleteButtonRendererComponent } from '../delete-button/delete-button.component';
import { ViewButtonRendererComponent } from '../view-button/view-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsService } from '../services/permissions.service';
import { RegisterButtonRendererComponent } from '../register-button/register-button.component';

@Component({
  selector: 'app-entrance-test-list',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './entrance-test-list.component.html',
  styleUrl: './entrance-test-list.component.css'
})
export class EntranceTestListComponent  implements OnInit {
  colDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', maxWidth: 200, filter: true },
    { headerName: 'Subject', field: 'subject_name', maxWidth: 200, filter: true },
    { headerName: 'Standard', field: 'standard_name', maxWidth: 200, filter: true },
    { headerName: 'Date', field: 'date', filter: true, maxWidth: 200 },
    { headerName: 'Start Time', field: 'start_time', filter: true, maxWidth: 200 },
    { headerName: 'End Time', field: 'end_time', filter: true, maxWidth: 200 },
    { headerName: 'Exam Type', field: 'exam_type', filter: true, maxWidth: 200 },
    { headerName: 'Registration Fee', field: 'registration_fee', filter: true, maxWidth: 200 },
    { headerName: 'Description', field: 'description', filter: true, maxWidth: 200 },
    { headerName: 'Location', field: 'location', filter: true, maxWidth: 200 },
    {
      field: 'Delete',
      cellRenderer: DeleteButtonRendererComponent,
      onCellClicked: this.delete.bind(this),
      maxWidth:200,
      hide: !this.permissionsService.getPermissions('Questions.delete_entrancetest'),

    },
    {
      field: 'Register',
      cellRenderer: RegisterButtonRendererComponent,
      onCellClicked: this.register.bind(this),
      maxWidth:200,
      // hide: !this.permissionsService.getPermissions('Questions.add_candidate'),

    },
    // {
    //   headerName: 'Register',
    //   field: 'actions',
    //   cellRenderer: (params: any) => {
    //     return `<button class="btn btn-sm btn-primary" onclick="navigateToCandidates(${params.value})">Register Candidate</button>`;
    //   },
    //   maxWidth: 150,
    //   suppressSizeToFit: true,
    //   checkboxSelection: true,
    // }

  ];
  autoSizeStrategy: any;

  rowData: any[] = [];

  constructor(
    private entranceTestService: EntranceTestService,
    private router: Router,
    public permissionsService: PermissionsService,
    private route: ActivatedRoute,
  ) {
    this.autoSizeStrategy = {
      type: 'fitCellContents',
  };
  }

  ngOnInit(): void {
    this.loadEntranceTests();
  }

  loadEntranceTests(): void {
    this.entranceTestService.getEntranceTests().subscribe(data => {
      this.rowData = data;
    });
  }

  delete(e: any) {
    this.deleteEntranceTest(e.data.id);
  }
  register(e: any) {
    // this.deleteEntranceTest(e.data.id);
    this.router.navigate(['/candidates/'+e.data.id])
  }
  deleteEntranceTest(entranceTestId: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.entranceTestService.deleteEntranceTest(entranceTestId).subscribe({
        next: (response) => {
          console.log('Question Paper deleted:', response);
          this.loadEntranceTests();
        },
        error: (error) => {
          console.error('Error deleting entrance test', error);
        },
      });
    }
  }
  // view(e: any) {
  //   console.log('veiw clicked');
  //   this.router.navigate(['/question-paper-view', e.data.id]);
  // }

  navigateToCandidates(entranceTestId: number) {
    this.router.navigate(['/candidates', entranceTestId], { relativeTo: this.route });
  }
}
