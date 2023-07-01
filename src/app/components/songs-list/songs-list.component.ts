import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { SongMapper } from 'src/app/mappers/song.mapper';
import { Song } from 'src/app/model/song';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {

  public songs: Song[] = [];

  constructor(
    private songsOp: SongsService,
  ) {}

  ngOnInit(): void {
    this.fetchData(); 
  }

  click() {
    this.songsOp.getAllSongs().subscribe(songs => console.log(songs));
  }

  fetchData() {
    this.songsOp.getAllSongs().subscribe((songs: Song[]) => {
      this.songs = songs;
    });
  }

  getNewestDate(song: Song): string {
    if(song.newestRecordDate)
      return song.newestRecordDate.toLocaleDateString()
    return "údaj chybí";
  }


}
