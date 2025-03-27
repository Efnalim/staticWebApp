import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ConfirmationComponent } from 'src/app/components/dialog/confirmation/confirmation.component';
import { CreateSongComponent } from 'src/app/components/songs-list/create-song/create-song.component';
import { SongDetailComponent } from 'src/app/components/songs-list/song-detail/song-detail.component';
import { SongsListComponent } from 'src/app/components/songs-list/songs-list.component';
import { MomentPipe } from 'src/app/pipes/moment.pipe';
import { LoginComponent } from 'src/app/components/login/login.component';
import { ListHeaderComponent } from 'src/app/components/list-header/list-header.component';


@NgModule({
  declarations: [
    SongsListComponent,
    CreateSongComponent,
    SongDetailComponent,
    ConfirmationComponent,
    ListHeaderComponent,
    LoginComponent,
    MomentPipe,
  ],
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],

  exports: [
    SongsListComponent, 
    ListHeaderComponent,
    LoginComponent,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
})
export class SharedModule {}
