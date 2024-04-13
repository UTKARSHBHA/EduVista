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
    {path: 'question-generator',loadComponent: () => import("./question-paper-generator/question-paper-generator.component").then((m) => m.QuestionPaperGeneratorComponent) },

    {path: 'questions-list',loadComponent: () => import("./questions/questions-list/questions-list.component").then((m) => m.QuestionsListComponent) },
    {path: 'questions-details',loadComponent: () => import("./questions/questions-details/questions-details.component").then((m) => m.QuestionDetailsComponent) },
    {path: 'question-view/:id',loadComponent: () => import("./questions/question-view/question-view.component").then((m) => m.QuestionViewComponent) },

    { path: 'questions/:id', loadComponent: () => import("./questions/questions.component").then((m) => m.QuestionsComponent) },
];
