import { Component } from '@angular/core';

import {
  MatDialogRef
} from '@angular/material/dialog';
import { firstValueFrom, take } from 'rxjs';
import { Song } from 'src/app/model/song';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent {

  public nameInput: string = ""
  public numberInput: string = ""

  constructor(
    private dialogRef: MatDialogRef<CreateSongComponent>,
    private songsService: SongsService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSave(): Promise<void> {
    let newSong: Song = new Song();
    newSong.songName = this.nameInput;
    newSong.songNumber = this.numberInput;
    console.log("posting: ", newSong);
    const source$ = this.songsService.postNewSong(newSong).pipe(take(1));
    const returnValue = await firstValueFrom(source$);
    console.log("got back", returnValue);
    
  }

  onClose() {
    this.dialogRef.close();
  }
}
