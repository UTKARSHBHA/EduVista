import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StandardsComponent } from './standards/standards.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , StandardsComponent, SubjectsComponent , RouterModule, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'question-bank-ui';
}
