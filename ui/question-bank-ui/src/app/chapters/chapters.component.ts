import { Component } from '@angular/core';
import { ChaptersService } from '../services/chapters.service';

@Component({
  selector: 'app-chapters',
  standalone: true,
  imports: [],
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.css'
})
export class ChaptersComponent {
  chapters: any = [];

 constructor(private service: ChaptersService) { }

 ngOnInit(): void {
    this.service.getChapters().subscribe(data => {
      this.chapters = data;
      console.log(this.chapters);
    });
 }
}
