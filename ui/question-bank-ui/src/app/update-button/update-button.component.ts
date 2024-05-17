// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-update-button',
//   standalone: true,
//   imports: [],
//   templateUrl: './update-button.component.html',
//   styleUrl: './update-button.component.css'
// })
// export class UpdateButtonComponent {

// }





  

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-update-button',
  standalone: true,
  imports: [],
  styleUrl: './update-button.component.css',
  // template: `<button>Delete</button>`,
  templateUrl: './update-button.component.html',

})
export class UpdateButtonRendererComponent implements ICellRendererAngularComp {
  agInit(params: ICellRendererParams): void {}
  refresh(params: ICellRendererParams) {
    return true;
  }
}
