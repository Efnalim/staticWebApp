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
  public numberInput: string = ""

  private sortByNameDescending: boolean = true;
  private sortByDateDescending: boolean = true;
  private sortByPlayedTimesDescending: boolean = true;

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
      if(result) {
        this.fetchData();
      }
    });
  }

  fetchData() {
    this.songsOp.getAllSongs().subscribe((songs: Song[]) => {
      this.originalSongs = songs;
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

  onNameInputChanged(event$: any) {
    this.songs = this.originalSongs.filter(s => s.songName.toLowerCase().includes(this.nameInput.toLowerCase()));
  }

  onNumberInputChanged(event$: any) {
    this.songs = this.originalSongs.filter(s => 
      (s.songNumber != null) && 
      (s.songNumber != undefined) && 
      JSON.stringify(s.songNumber).toLowerCase().includes(this.numberInput.toLowerCase())
    );
  }

  openDetail(song: Song): void {
    let dialogRef = this.dialog.open(SongDetailComponent, { width: '100vw' });
    dialogRef.componentInstance.setSongToEdit(song);

    dialogRef.afterClosed().subscribe((result) => {
      if(result === true) {
        this.fetchData();
      }
    });
  }

  sortSongsByDate() {
    this.songs.sort((a, b) => {
      if(!a.newestRecordDate) return -1;
      if(!b.newestRecordDate) return 1;
      return a.newestRecordDate.getTime() - b.newestRecordDate.getTime();
    })

    if(this.sortByDateDescending) {
      this.songs.reverse();
    }
    this.sortByDateDescending = !this.sortByDateDescending
  }

  sortSongsByName() {
    this.songs.sort((a, b) => {
      return ('' + a.songName).localeCompare(b.songName);
    })

    if(this.sortByNameDescending) {
      this.songs.reverse();
    }
    this.sortByNameDescending = !this.sortByNameDescending
  }

  sortSongsByPlayedTimes() {
    this.songs.sort((a, b) => a.playedThisYearTimes - b.playedThisYearTimes);

    if(this.sortByPlayedTimesDescending) {
      this.songs.reverse();
    }
    this.sortByPlayedTimesDescending = !this.sortByPlayedTimesDescending
  }
}
