import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ColDef, ColDefUtil, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-register-button',
  standalone: true,
  imports: [],
  styleUrl: './register-button.component.css',
  // template: `<button>Delete</button>`,
  templateUrl: './register-button.component.html',

})
export class RegisterButtonRendererComponent implements ICellRendererAngularComp {
  agInit(params: ICellRendererParams): void {}
  refresh(params: ICellRendererParams) {
    return true;
  }
}
