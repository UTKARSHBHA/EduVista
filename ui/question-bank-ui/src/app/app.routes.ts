import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionViewComponent } from './questions/question-view/question-view.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'standards',loadComponent: () => import("./standards/standards.component").then((m) => m.StandardsComponent) },
    {path: 'subjects',loadComponent: () => import("./subjects/subjects.component").then((m) => m.SubjectsComponent) },
    {path: 'chapters',loadComponent: () => import("./chapters/chapters.component").then((m) => m.ChaptersComponent) },
    {path: 'topics',loadComponent: () => import("./topics/topics.component").then((m) => m.TopicsComponent) },
    {path: 'questions',loadComponent: () => import("./questions/questions.component").then((m) => m.QuestionsComponent) },
    {path: 'options',loadComponent: () => import("./options/options.component").then((m) => m.OptionsComponent) },

    {path: 'questions-list',loadComponent: () => import("./questions/questions-list/questions-list.component").then((m) => m.QuestionsListComponent) },
    {path: 'questions-details',loadComponent: () => import("./questions/questions-details/questions-details.component").then((m) => m.QuestionDetailsComponent) },
    {path: 'question-view/:id',loadComponent: () => import("./questions/question-view/question-view.component").then((m) => m.QuestionViewComponent) },
    // { path: 'question-view/:id', component: QuestionViewComponent },
    // {path: 'add-questions',loadComponent: () => import("./question-form/question-form.component").then((m) => m.QuestionFormComponent) },

    { path: 'questions/:id', loadComponent: () => import("./questions/questions.component").then((m) => m.QuestionsComponent) }, // For updating an existing question

];
