import { NgModule, isDevMode } from '@angular/core';
import { AppComponent } from './app.component';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from './modules/shared/shared.module';
import { SongsService } from './services/songs.service';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HymnsService } from './services/hymns.service';

const repositories = [ 
  { provide: SongsService },
  { provide: HymnsService },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    AppRoutingModule,
    BrowserModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'cs-CZ' },
     ...repositories,
  ], 
  bootstrap: [AppComponent],
})
export class AppModule {}
