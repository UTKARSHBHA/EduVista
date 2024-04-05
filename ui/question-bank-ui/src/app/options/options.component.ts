import { Component } from '@angular/core';
import { OptionsService } from '../services/options.service';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
  options: any = [];

 constructor(private service: OptionsService) { }

 ngOnInit(): void {
    this.service.getOptions().subscribe(data => {
      this.options = data;
      console.log(this.options);
    });
 }
}
