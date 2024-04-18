import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StandardsComponent } from './standards/standards.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , StandardsComponent, SubjectsComponent , RouterModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'question-bank-ui';
}
