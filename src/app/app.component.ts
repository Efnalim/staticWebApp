import { Component, OnInit } from '@angular/core';
import { SongsService } from './services/songs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private songsOp: SongsService) {}

  private user: any;
  title = 'app';

  public ngOnInit() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./sw.js')
        .then((registration) => {
          // Registration was successful
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          );
        })
        .catch((err) => {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
    }
  }
}
