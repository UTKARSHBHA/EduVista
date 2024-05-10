import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StandardsComponent } from './standards/standards.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , StandardsComponent, SubjectsComponent , RouterModule, NavBarComponent , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
username: any;
  constructor(public authService: AuthService){
    // this.username = localStorage.getItem('username');
  }
  title = 'question-bank-ui';
  getUserName(){
    return this.authService.username;
  }
}
