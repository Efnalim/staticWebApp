import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { HttpClientModule } from '@angular/common/http';
import { SongsService } from './services/songs.service';
import { SongsListComponent } from './components/songs-list/songs-list.component';

@NgModule({
  declarations: [AppComponent, SongsListComponent],
  imports: [
    HttpClientModule, 
    BrowserModule, 
    AppRoutingModule, 
    MatCardModule,
    MatIconModule,
  ],
  providers: [SongsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
