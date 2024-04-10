import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ColDef, ColDefUtil, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-delete-question-button',
  standalone: true,
  imports: [],
  styleUrl: './delete-question-button.component.css',
  // template: `<button>Delete</button>`,
  templateUrl: './delete-question-button.component.html',

})
export class DeleteButtonRendererComponent implements ICellRendererAngularComp {
  agInit(params: ICellRendererParams): void {}
  refresh(params: ICellRendererParams) {
    return true;
  }
}
