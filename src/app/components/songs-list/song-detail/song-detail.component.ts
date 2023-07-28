import { Component } from '@angular/core';
import { Song } from 'src/app/model/song';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent {

  public isEditting: boolean = false;

  public song: Song = new Song();

  onClose(): void {

  }

  onSave(): void {

  }

  addRecord(): void {
    
  }

}
