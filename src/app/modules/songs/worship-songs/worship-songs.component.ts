import { Component, OnInit } from '@angular/core';
import { MenuItem } from './../../../model/menu'
import { firstValueFrom } from 'rxjs';
import { SongsService } from 'src/app/services/songs.service';
import { Song } from 'src/app/model/song';

const menuItems: MenuItem[] = [
  {
    title: "Nápověda",
    icon: "question_mark",
    url: "https://app.tango.us/app/workflow/Jak-p-idat-z-znam-o-hran--p-sn--a57c8ab78e5349d999887b29cc01555b",
    openNewTab: true,
    newFeature: false
  },
  {
    title: "Bratrské písně",
    icon: "menu_book",
    url: "/songs/hymns",
    openNewTab: false,
    newFeature: localStorage.getItem("hymns") === null
  },
]

const title: string = "Chvály"

@Component({
  selector: 'app-worship-songs',
  templateUrl: './worship-songs.component.html',
  styleUrls: ['./worship-songs.component.css']
})
export class WorshipSongsComponent implements OnInit{
  
  public worshipSongs: Song[] = [];
  public title: string = title;
  public menuItems = menuItems;

  constructor(
    private songsOp: SongsService,
  ) {}
  
  ngOnInit(): void {
    console.log("worship-songs");
    this.fetchData();
  }

  async fetchData() {
    try {
      this.worshipSongs = await firstValueFrom(this.songsOp.getAllSongs());
    } catch (err) {
      console.error(err)
    }
  }
  
}
