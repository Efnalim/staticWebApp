import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from 'src/app/model/menu';
import {
  Song,
  SongType,
  hymnsPerformers,
  worshipSongsPerformers,
} from 'src/app/model/song';
// import { CreateSongComponent } from './create-song/create-song.component';
import { SongDetailComponent } from './song-detail/song-detail.component';

@Component({
  selector: 'songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css'],
})
export class SongsListComponent implements OnInit, OnChanges {
  @Input() songs: Song[] = [];
  @Input() menuItems: MenuItem[] = [];
  @Input() title: string = "";
  @Input() mode: SongType = SongType.WORSHIP_SONGS;

  @Output() reloadRequest = new EventEmitter<boolean>();

  public sortedSongs: Song[] = [];
  public performers: string[] = [];

  public nameInput: string = '';
  public numberInput: string = '';
  public performerInput: string[] = [];

  private sortByNameDescending: boolean = false;
  private sortByDateDescending: boolean = true;
  private sortByPlayedTimesDescending: boolean = true;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.mode === SongType.WORSHIP_SONGS) {
      this.performers = worshipSongsPerformers;
    } else if (this.mode === SongType.HYMNS) {
      this.performers = hymnsPerformers;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sortedSongs = this.songs.slice();
    this.sortByDateDescending = true;
    this.sortSongsByDate();
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
    this.sortedSongs = this.songs.filter((s) =>
      s.songName.toLowerCase().includes(this.nameInput.toLowerCase())
    );
  }

  onPerformerInputChanged(event$: any) {
    console.log(this.performerInput);
    if (this.performerInput.length == 0) {
      this.sortedSongs = this.songs;
    } else {
      this.sortedSongs = this.songs.filter((s) =>
        s.records.some((record) =>
          this.performerInput.some(
            (chosenPerformer) => chosenPerformer === record.performer
          )
        )
      );
    }
  }

  onNumberInputChanged(event$: any) {
    this.sortedSongs = this.songs.filter(
      (s) =>
        s.songNumber != null &&
        s.songNumber != undefined &&
        JSON.stringify(s.songNumber)
          .toLowerCase()
          .includes(this.numberInput.toLowerCase())
    );
  }

  openDetail(song: Song): void {
    let dialogRef = this.dialog.open(SongDetailComponent, { width: '100vw' });
    dialogRef.componentInstance.setSongToEdit(song);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.reloadRequest.next(true);
      }
    });
  }

  sortSongsByDate() {
    this.sortedSongs.sort((a, b) => {
      if (!a.newestRecordDate) return -1;
      if (!b.newestRecordDate) return 1;
      return a.newestRecordDate.getTime() - b.newestRecordDate.getTime();
    });

    if (this.sortByDateDescending) {
      this.sortedSongs.reverse();
    }
    this.sortByDateDescending = !this.sortByDateDescending;
  }

  sortSongsByName() {
    this.sortedSongs.sort((a, b) => {
      return ('' + a.songName).localeCompare(b.songName);
    });

    if (this.sortByNameDescending) {
      this.sortedSongs.reverse();
    }
    this.sortByNameDescending = !this.sortByNameDescending;
  }

  sortSongsByPlayedTimes() {
    this.sortedSongs.sort(
      (a, b) => a.playedThisYearTimes - b.playedThisYearTimes
    );

    if (this.sortByPlayedTimesDescending) {
      this.sortedSongs.reverse();
    }
    this.sortByPlayedTimesDescending = !this.sortByPlayedTimesDescending;
  }
}
