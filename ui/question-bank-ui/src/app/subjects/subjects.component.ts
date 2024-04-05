import { Component } from '@angular/core';
import { SubjectsService } from '../services/subjects.service';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {
  subjects: any = [];

 constructor(private service: SubjectsService) { }

 ngOnInit(): void {
    this.service.getSubjects().subscribe(data => {
      this.subjects = data;
      console.log(this.subjects);
    });
 }
}
