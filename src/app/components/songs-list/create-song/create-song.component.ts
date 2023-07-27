import { Component, Inject } from '@angular/core';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Song } from 'src/app/model/song';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent {

  public nameInput: string = ""
  public numberInput: string = ""

  constructor(
    public dialogRef: MatDialogRef<CreateSongComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    let newSong: Song = new Song();
    newSong.songName = this.nameInput;
    newSong.songNumber = this.numberInput;
    console.log(newSong);
    
  }
}
