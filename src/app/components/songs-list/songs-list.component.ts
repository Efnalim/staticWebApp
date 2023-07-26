import { Component, OnInit } from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { Song } from 'src/app/model/song';
import { SongsService } from 'src/app/services/songs.service';
import 'tw-elements';
import { CreateSongComponent } from './create-song/create-song.component';

@Component({
  selector: 'songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css'],
})
export class SongsListComponent implements OnInit {
  public songs: Song[] = [];

  constructor(private songsOp: SongsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
  }

  click(): void {
    let dialogRef = this.dialog.open(CreateSongComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  fetchData() {
    this.songsOp.getAllSongs().subscribe((songs: Song[]) => {
      this.songs = songs;
    });
  }

  getNewestDate(song: Song): string {
    if (song.newestRecordDate)
      return song.newestRecordDate.toLocaleDateString();
    return 'údaj chybí';
  }

  isNaN(value: number): boolean {
    return isNaN(value);
  }
}
