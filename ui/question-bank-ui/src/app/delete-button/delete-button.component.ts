import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ColDef, ColDefUtil, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [],
  styleUrl: './delete-button.component.css',
  // template: `<button>Delete</button>`,
  templateUrl: './delete-button.component.html',

})
export class DeleteButtonRendererComponent implements ICellRendererAngularComp {
  agInit(params: ICellRendererParams): void {}
  refresh(params: ICellRendererParams) {
    return true;
  }
}
