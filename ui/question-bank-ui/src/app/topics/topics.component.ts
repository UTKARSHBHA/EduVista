import { Component } from '@angular/core';
import { TopicsService } from '../services/topics.service';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css'
})
export class TopicsComponent {
  topics: any = [];

 constructor(private service: TopicsService) { }

 ngOnInit(): void {
    this.service.getTopics().subscribe(data => {
      this.topics = data;
      console.log(this.topics);
    });
 }
}
