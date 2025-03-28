import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom, take } from 'rxjs';
import { sortRecords } from 'src/app/mappers/song.mapper';
import {
  Song,
  SongType,
  hymnsPerformers,
  worshipSongsPerformers,
} from 'src/app/model/song';
import { SongsService } from 'src/app/services/songs.service';
import { ConfirmationComponent } from '../../dialog/confirmation/confirmation.component';
import { HymnsService } from 'src/app/services/hymns.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css'],
})
export class SongDetailComponent {
  public isEditting: boolean = false;
  public isAddingRecord: boolean = false;
  public showOnlyRehearsals = false;

  public mode: SongType = SongType.WORSHIP_SONGS;

  public song: Song = new Song();

  public newRecord: Date = new Date();

  public performers: string[] = [];
  public potentialRehearsers: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<SongDetailComponent>,
    private songsService: SongsService,
    private hymnsService: HymnsService,
    private dialog: MatDialog
  ) {}

  setSongToEdit(originalSong: Song): void {
    this.song = JSON.parse(JSON.stringify(originalSong));
    this.mode = originalSong.type;
    if (this.mode === SongType.WORSHIP_SONGS) {
      this.performers = worshipSongsPerformers;
    } else if (this.mode === SongType.HYMNS) {
      this.performers = hymnsPerformers;
      this.potentialRehearsers = this.performers.slice()
      this.song.rehearsers.forEach(performer => {
        this.potentialRehearsers = this.potentialRehearsers.filter(rehearser => rehearser !== performer)
      })
    }
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  async onSave(): Promise<void> {
    if (this.mode === SongType.WORSHIP_SONGS) {
      const source$ = this.songsService.updateSong(this.song).pipe(take(1));
      const returnValue = await firstValueFrom(source$);
    } else if (this.mode === SongType.HYMNS) {
      const source$ = this.hymnsService.updateSong(this.song).pipe(take(1));
      const returnValue = await firstValueFrom(source$);
    }

    this.dialogRef.close(true);
  }

  async onDelete(): Promise<void> {
    let dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '250px',
      data: {
        question: `Opravdu chcete smazat píseň: ${this.song.songName} ?`,
      },
    });

    const retValsource$ = await dialogRef.afterClosed().pipe(take(1));
    const retVal = await firstValueFrom(retValsource$);

    if (!retVal) {
      return;
    }

    const source$ = this.songsService.deleteSong(this.song).pipe(take(1));
    const returnValue = await firstValueFrom(source$);

    this.dialogRef.close(true);
  }

  addRecord(): void {
    this.isAddingRecord = true;
    this.isEditting = true;
  }
  
  addRehearser(rehearser: string): void {
    this.song.rehearsers.push(rehearser)
    this.potentialRehearsers = this.potentialRehearsers.filter(potentialRehearser => potentialRehearser !== rehearser)
    this.isEditting = true;
    this.song.records = sortRecords(
      [{ date: new Date(2021, 0, 1), performer: rehearser }, ...this.song.records].map(
        (record: any) => {
          return { date: new Date(record.date), performer: record.performer };
        }
      )
    );
  }

  onAction(option: string) {
    console.log('Selected:', option);
  }

  removeRecord(idx: number): void {
    this.song.records.splice(idx, 1);
  }

  saveRecord(): void {
    // const mostFrequentPerformer = this.song.records.
    this.song.records = sortRecords(
      [{ date: this.newRecord, performer: this.getMostFrequentPerformer() }, ...this.song.records].map(
        (record: any) => {
          return { date: new Date(record.date), performer: record.performer };
        }
      )
    );
    this.song.newestRecordDate = this.song.records[0].date;
    this.newRecord = new Date();
    this.isAddingRecord = false;
  }

  setPerformerOfRecord(
    record: {
      date: Date;
      performer: string;
    },
    performer: string
  ) {
    record.performer = performer;
  }

  getMostFrequentPerformer(): string | undefined {
    if (this.song.records.length === 0) return undefined;
  
    const frequencyMap: Record<string, number> = {};
  
    this.song.records.forEach(record => {
      frequencyMap[record.performer] = (frequencyMap[record.performer] || 0) + 1;
    });
  
    // Find the performer with the max count
    return Object.keys(frequencyMap).reduce((maxPerformer, performer) =>
      frequencyMap[performer] > (frequencyMap[maxPerformer] || 0) ? performer : maxPerformer
    );
  }
}
