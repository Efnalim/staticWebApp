import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom, take } from 'rxjs';
import { sortRecords } from 'src/app/mappers/song.mapper';
import { Song } from 'src/app/model/song';
import { SongsService } from 'src/app/services/songs.service';
import { ConfirmationComponent } from '../../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent {
  
  public isEditting: boolean = false;
  public isAddingRecord: boolean = false;
  
  public song: Song = new Song();
  
  public newRecord: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<SongDetailComponent>,
    private songsService: SongsService,
    private dialog: MatDialog,
  ) { }

  setSongToEdit(originalSong: Song): void {
    this.song = JSON.parse(JSON.stringify(originalSong));
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  async onSave(): Promise<void> {
    const source$ = this.songsService.updateSong(this.song).pipe(take(1));
    const returnValue = await firstValueFrom(source$);
    
    this.dialogRef.close(true);
  }

  async onDelete(): Promise<void> {
    let dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '250px',
      data: { question: `Opravdu chcete smazat píseň: ${this.song.songName} ?` }
    });

    const retValsource$ = await dialogRef.afterClosed().pipe(take(1));
    const retVal = await firstValueFrom(retValsource$);

    if(!retVal) {
      return;
    }

    const source$ = this.songsService.deleteSong(this.song).pipe(take(1));
    const returnValue = await firstValueFrom(source$);
    
    this.dialogRef.close(true);
  }

  addRecord(): void {
    this.isAddingRecord = true;
  }

  removeRecord(idx: number): void {
    this.song.records.splice(idx, 1);
  }

  saveRecord(): void {
    this.song.records = sortRecords([{date: this.newRecord, performer: "0"}, ... this.song.records]
      .map((record: any) => {
        return { date: new Date(record.date), performer: record.performerID}
    }));

    this.song.newestRecordDate = this.song.records[0].date;
    this.newRecord = new Date();
    this.isAddingRecord = false;
    
  }

}
