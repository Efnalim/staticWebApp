import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'statistics', loadChildren: () => import('./modules/statistics/statistics.module').then(mod => mod.StatisticsModule)},
  { path: 'songs', loadChildren: () => import('./modules/songs/songs.module').then(mod => mod.SongsModule)},
  { path: 'newsletter', loadChildren: () => import('./modules/newsletter/newsletter.module').then(mod => mod.NewsletterModule)},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'songs', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
