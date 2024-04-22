import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionViewComponent } from './questions/question-view/question-view.component';
import { AuthGuard } from './auth.guard';
import { QuestionsComponent } from './questions/questions.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'standards', loadComponent: () => import("./standards/standards.component").then((m) => m.StandardsComponent), canActivate: [AuthGuard]},
    {path: 'subjects', loadComponent: () => import("./subjects/subjects.component").then((m) => m.SubjectsComponent), canActivate: [AuthGuard]},
    {path: 'chapters', loadComponent: () => import("./chapters/chapters.component").then((m) => m.ChaptersComponent), canActivate: [AuthGuard]},
    {path: 'topics', loadComponent: () => import("./topics/topics.component").then((m) => m.TopicsComponent), canActivate: [AuthGuard]},
    {path: 'questions', loadComponent: () => import("./questions/questions.component").then((m) => m.QuestionsComponent), canActivate: [AuthGuard]},
    {path: 'options', loadComponent: () => import("./options/options.component").then((m) => m.OptionsComponent), canActivate: [AuthGuard]},
    {path: 'question-generator', loadComponent: () => import("./question-paper-generator/question-paper-generator.component").then((m) => m.QuestionPaperGeneratorComponent), canActivate: [AuthGuard]},
    {path: 'questions-list', loadComponent: () => import("./questions/questions-list/questions-list.component").then((m) => m.QuestionsListComponent), canActivate: [AuthGuard]},
    {path: 'questions-details', loadComponent: () => import("./questions/questions-details/questions-details.component").then((m) => m.QuestionDetailsComponent), canActivate: [AuthGuard]},
    {path: 'question-view/:id', loadComponent: () => import("./questions/question-view/question-view.component").then((m) => m.QuestionViewComponent), canActivate: [AuthGuard]},
    {path: 'questions/:id', loadComponent: () => import("./questions/questions.component").then((m) => m.QuestionsComponent), canActivate: [AuthGuard]},
    {path: 'login', loadComponent: () => import("./login/login.component").then((m) => m.LoginComponent)},
    {path: 'signup', loadComponent: () => import("./signup/signup.component").then((m) => m.SignupComponent)},
    {path: 'password-reset', loadComponent: () => import("./password-reset/password-reset.component").then((m) => m.PasswordResetComponent)},
    {path: 'api/password_reset_confirm/:token', loadComponent: () => import("./password-reset-confirm/password-reset-confirm.component").then((m) => m.PasswordResetConfirmComponent)},
    {path: 'change-password', loadComponent: () => import("./change-password/change-password.component").then((m) => m.ChangePasswordComponent), canActivate: [AuthGuard]},
    
    

];