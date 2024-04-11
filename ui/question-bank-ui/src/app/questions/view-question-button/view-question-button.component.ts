// import { Component, Output } from '@angular/core';
// import { ICellRendererAngularComp } from 'ag-grid-angular';
// import { ICellRendererParams } from 'ag-grid-community';
// import { EventEmitter } from 'stream';

// @Component({
//   selector: 'app-view-question-button',
//   standalone: true,
//   imports: [],
//   templateUrl: './view-question-button.component.html',
//   styleUrl: './view-question-button.component.css'
// })
// export class ViewQuestionButtonComponent implements ICellRendererAngularComp {
//     agInit(params: ICellRendererParams): void {}
//     refresh(params: ICellRendererParams) {
//       return true;
//     }
//   }
  

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-view-question-button',
  standalone: true,
  imports: [],
  styleUrl: './view-question-button.component.css',
  // template: `<button>Delete</button>`,
  templateUrl: './view-question-button.component.html',

})
export class ViewButtonRendererComponent implements ICellRendererAngularComp {
  agInit(params: ICellRendererParams): void {}
  refresh(params: ICellRendererParams) {
    return true;
  }
}
