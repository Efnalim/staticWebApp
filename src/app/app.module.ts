import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';

import { HttpClientModule } from '@angular/common/http';
import { SongsService } from './services/songs.service';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CreateSongComponent } from './components/songs-list/create-song/create-song.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SongDetailComponent } from './components/songs-list/song-detail/song-detail.component';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { ConfirmationComponent } from './components/dialog/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    SongsListComponent,
    CreateSongComponent,
    SongDetailComponent,
    ConfirmationComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [SongsService, { provide: MAT_DATE_LOCALE, useValue: 'cs-CZ' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
