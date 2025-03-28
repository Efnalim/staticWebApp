import { Component, OnInit } from '@angular/core';
import { MenuItem } from './../../../model/menu';
import { firstValueFrom } from 'rxjs';
import { SongsService } from 'src/app/services/songs.service';
import { Song } from 'src/app/model/song';
import { MenuService } from 'src/app/services/menu.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateSongComponent } from 'src/app/components/songs-list/create-song/create-song.component';

const title: string = 'Chvály';

@Component({
  selector: 'app-worship-songs',
  templateUrl: './worship-songs.component.html',
  styleUrls: ['./worship-songs.component.css'],
})
export class WorshipSongsComponent implements OnInit {
  public worshipSongs: Song[] = [];
  public title: string = title;
  public menuItems: MenuItem[] = [];

  constructor(
    private songsOp: SongsService,
    private menuService: MenuService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.menuItems = this.menuService
      .getMenuItems()
      .filter((item) => item.title !== this.title);
    this.menuItems.push({
      title: 'Nápověda',
      icon: 'question_mark',
      url: 'https://app.tango.us/app/workflow/Jak-p-idat-z-znam-o-hran--p-sn--a57c8ab78e5349d999887b29cc01555b',
      openNewTab: true,
      newFeature: false,
    });
    this.fetchData();
  }

  async fetchData() {
    try {
      this.worshipSongs = await firstValueFrom(this.songsOp.getAllSongs());
    } catch (err) {
      console.error(err);
    }
  }

  click(): void {
    let dialogRef = this.dialog.open(CreateSongComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchData();
      }
    });
  }
}
