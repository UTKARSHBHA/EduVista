import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'standards',
    loadComponent: () =>
      import('./standards/standards.component').then(
        (m) => m.StandardsComponent
      ),
  },
  {
    path: 'subjects',
    loadComponent: () =>
      import('./subjects/subjects.component').then((m) => m.SubjectsComponent),
  },
  {
    path: 'chapters',
    loadComponent: () =>
      import('./chapters/chapters.component').then((m) => m.ChaptersComponent),
  },
  {
    path: 'topics',
    loadComponent: () =>
      import('./topics/topics.component').then((m) => m.TopicsComponent),
  },
  {
    path: 'questions',
    loadComponent: () =>
      import('./questions/questions.component').then(
        (m) => m.QuestionsComponent
      ),
  },
  {
    path: 'options',
    loadComponent: () =>
      import('./options/options.component').then((m) => m.OptionsComponent),
  },
  { path: '**', redirectTo: '/home' },
];
