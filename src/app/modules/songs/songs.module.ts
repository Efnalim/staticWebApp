import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HymnsComponent } from './hymns/hymns.component';
import { SongsRoutingModule } from './songs-routing.module';
import { WorshipSongsComponent } from './worship-songs/worship-songs.component';

@NgModule({
  declarations: [
    HymnsComponent,
    WorshipSongsComponent
  ],
  imports: [
    SongsRoutingModule,
    SharedModule,
  ]
})
export class SongsModule { }
