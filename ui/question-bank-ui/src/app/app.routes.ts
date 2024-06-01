import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionViewComponent } from './questions/question-view/question-view.component';
import { AuthGuard } from './auth.guard';
import { QuestionsComponent } from './questions/questions.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'standards',
    loadComponent: () =>
      import('./standards/standards.component').then(
        (m) => m.StandardsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'subjects',
    loadComponent: () =>
      import('./subjects/subjects.component').then((m) => m.SubjectsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'tags',
    loadComponent: () =>
      import('./tags/tags.component').then((m) => m.TagsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'chapters',
    loadComponent: () =>
      import('./chapters/chapters.component').then((m) => m.ChaptersComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'topics',
    loadComponent: () =>
      import('./topics/topics.component').then((m) => m.TopicsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'questions',
    loadComponent: () =>
      import('./questions/questions.component').then(
        (m) => m.QuestionsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'entrance-test',
    loadComponent: () =>
      import('./entrance-test/entrance-test.component').then(
        (m) => m.EntranceTestComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'candidates/:entranceTestId',
    loadComponent: () =>
      import('./candidates/candidates.component').then((m) => m.CandidatesComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'entrance-test-list',
    loadComponent: () =>
      import('./entrance-test-list/entrance-test-list.component').then(
        (m) => m.EntranceTestListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'candidate-list',
    loadComponent: () =>
      import('./candidate-list/candidate-list.component').then(
        (m) => m.CandidateListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'options',
    loadComponent: () =>
      import('./options/options.component').then((m) => m.OptionsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'question-generator',
    loadComponent: () =>
      import(
        './question-paper-generator/question-paper-generator.component'
      ).then((m) => m.QuestionPaperGeneratorComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'questions-list',
    loadComponent: () =>
      import('./questions/questions-list/questions-list.component').then(
        (m) => m.QuestionsListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'question-papers-list',
    loadComponent: () =>
      import('./questions/question-papers-list/question-papers-list.component').then(
        (m) => m.QuestionPapersListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'student-registration',
    loadComponent: () =>
      import('./student-registration/student-registration.component').then(
        (m) => m.StudentRegistrationComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'student-list',
    loadComponent: () =>
      import('./student-list/student-list.component').then(
        (m) => m.StudentListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'teacher-list',
    loadComponent: () =>
      import('./teacher-list/teacher-list.component').then(
        (m) => m.TeacherListComponent
      ),
    canActivate: [AuthGuard],
  },
  
  {
    path: 'question-view/:id',
    loadComponent: () =>
      import('./questions/question-view/question-view.component').then(
        (m) => m.QuestionViewComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'student-view/:id',
    loadComponent: () =>
      import('./student-view/student-view.component').then(
        (m) => m.StudentViewComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'teacher-view/:id',
    loadComponent: () =>
      import('./teacher-view/teacher-view.component').then(
        (m) => m.TeacherViewComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'question-paper-view/:id',
    loadComponent: () =>
      // ui/question-bank-ui/src/app/question-papers/question-paper-view/question-paper-view.component.ts
      import('./question-papers/question-paper-view/question-paper-view.component').then(
        (m) => m.QuestionPaperViewComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'questions/:id',
    loadComponent: () =>
      import('./questions/questions.component').then(
        (m) => m.QuestionsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'student-registration/:id',
    loadComponent: () =>
      import('./student-registration/student-registration.component').then(
        (m) => m.StudentRegistrationComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'password-reset',
    loadComponent: () =>
      import('./password-reset/password-reset.component').then(
        (m) => m.PasswordResetComponent
      ),
  },
  {
    path: 'api/password_reset_confirm/:token',
    loadComponent: () =>
      import('./password-reset-confirm/password-reset-confirm.component').then(
        (m) => m.PasswordResetConfirmComponent
      ),
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./change-password/change-password.component').then(
        (m) => m.ChangePasswordComponent
      ),
    canActivate: [AuthGuard],
  },
];
