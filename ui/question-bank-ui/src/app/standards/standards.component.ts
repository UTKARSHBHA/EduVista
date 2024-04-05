import { Component } from '@angular/core';
import { StandardsService } from '../services/standards.service';

@Component({
  selector: 'app-standards',
  standalone: true,
  imports: [],
  templateUrl: './standards.component.html',
  styleUrl: './standards.component.css'
})
export class StandardsComponent {
  standards: any = [];

 constructor(private service: StandardsService) { }

 ngOnInit(): void {
    this.service.getStandards().subscribe(data => {
      this.standards = data;
      console.log(this.standards);
    });
 }
}
