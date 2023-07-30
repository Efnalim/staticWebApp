import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Song } from 'src/app/model/song';

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
  ) { }

  setSongToEdit(originalSong: Song): void {
    this.song = JSON.parse(JSON.stringify(originalSong));
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {

  }

  addRecord(): void {
    this.isAddingRecord = true;
  }

  removeRecord(idx: number): void {
    this.song.records.splice(idx, 1);
  }

  saveRecord(): void {
    this.song.records = [{date: this.newRecord, performer: "0"}, ... this.song.records]
      .map((record: any) => {
        return { date: new Date(record.date), performer: record.performerID}
    }).sort((a: {
        date: Date;
        performer: string;
    }, b: {
        date: Date;
        performer: string;
    }) => b.date.getTime() - a.date.getTime());;

    this.song.newestRecordDate = this.song.records[0].date;
    this.newRecord = new Date();
    this.isAddingRecord = false;
  }

}
