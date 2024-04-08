import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  constructor(private router: Router) { }

  navigateTo(section: string) {
    this.router.navigate(['/' + section.toLowerCase()]);
  }
}
