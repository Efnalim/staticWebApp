import { Component, OnInit } from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { Song } from 'src/app/model/song';
import { SongsService } from 'src/app/services/songs.service';
import { CreateSongComponent } from './create-song/create-song.component';
import { SongDetailComponent } from './song-detail/song-detail.component';

@Component({
  selector: 'songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css'],
})
export class SongsListComponent implements OnInit {
  public songs: Song[] = [];
  public originalSongs: Song[] = [];

  public nameInput: string = ""

  constructor(
    private songsOp: SongsService,
    public dialog: MatDialog,
  ) {}

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
      this.originalSongs = songs;
      this.songs = songs;

      console.log(this.songs);
      
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

  onNameInputChanged(event$: any) {
    this.songs = this.originalSongs.filter(s => s.songName.toLowerCase().includes(this.nameInput.toLowerCase()));
  }

  openDetail(song: Song): void {
    let dialogRef = this.dialog.open(SongDetailComponent, { width: '100vw' });
    dialogRef.componentInstance.setSongToEdit(song);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if(result === true) {
        this.fetchData();
      }
    });
  }
}
