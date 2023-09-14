import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorshipSongsComponent } from './worship-songs/worship-songs.component';
import { HymnsComponent } from './hymns/hymns.component';

const routes: Routes = [
  { path: 'worship', component: WorshipSongsComponent },
  { path: 'hymns', component: HymnsComponent },
  { path: '', redirectTo: 'worship', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongsRoutingModule {}
