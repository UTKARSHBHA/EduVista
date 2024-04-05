import { Routes } from '@angular/router';
import { StandardsComponent } from './standards/standards.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { HomeComponent } from './home/home.component';
import { TopicsComponent } from './topics/topics.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { QuestionsComponent } from './questions/questions.component';
import { OptionsComponent } from './options/options.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'standards', component: StandardsComponent},
    {path: 'subjects', component: SubjectsComponent},
    {path: 'topics', component: TopicsComponent},
    {path: 'chapters', component: ChaptersComponent},
    {path: 'questions', component: QuestionsComponent},
    {path: 'options', component: OptionsComponent},
];
