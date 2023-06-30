import { Component, OnInit } from '@angular/core';
import { SongsService } from './services/songs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    private songsOp: SongsService,
  ) {}

  private user: any;
  title = 'app';

  async ngOnInit(): Promise<void> {
  }


  click() {
    this.songsOp.getAllSongs().subscribe(songs => console.log(songs));
  }

  
}
