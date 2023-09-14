import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'songs', loadChildren: () => import('./modules/songs/songs.module').then(mod => mod.SongsModule)},
  { path: '', redirectTo: 'songs', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
