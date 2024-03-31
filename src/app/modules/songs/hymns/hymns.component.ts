import { Component, OnInit } from '@angular/core';
import { MenuItem } from './../../../model/menu'
import { firstValueFrom } from 'rxjs';
import { SongsService } from 'src/app/services/songs.service';
import { Song, SongType } from 'src/app/model/song';
import { HymnsService } from 'src/app/services/hymns.service';

const menuItems: MenuItem[] = [
  {
    title: "Nápověda",
    icon: "question_mark",
    url: "https://app.tango.us/app/workflow/Jak-p-idat-z-znam-o-hran--p-sn--a57c8ab78e5349d999887b29cc01555b",
    openNewTab: true,
    newFeature: false
  },
  {
    title: "Chvály",
    icon: "music_note",
    url: "/songs/worship",
    openNewTab: false,
    newFeature: false
  },
  {
    title: "Zpravodaj",
    icon: "calendar_today",
    url: "/newsletter",
    openNewTab: false,
    newFeature: localStorage.getItem("newsletter") === null
  }
]

const mode: SongType = SongType.HYMNS

const title: string = "Bratrské písně"

@Component({
  selector: 'app-hymns-songs',
  templateUrl: './hymns.component.html',
  styleUrls: ['./hymns.component.css']
})
export class HymnsComponent implements OnInit{
  
  public hymns: Song[] = [];
  public title: string = title;
  public menuItems = menuItems;
  public mode = mode;

  constructor(
    private songsOp: HymnsService,
  ) {}
  
  ngOnInit(): void {
    localStorage.setItem('hymns', "visited")
    this.fetchData();
  }

  async fetchData() {
    try {
      this.hymns = await firstValueFrom(this.songsOp.getAllSongs());
    } catch (err) {
      console.error(err)
    }
  }
  
}
