import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Song, SongType } from 'src/app/model/song';
import { HymnsService } from 'src/app/services/hymns.service';
import { MenuService } from 'src/app/services/menu.service';
import { MenuItem } from './../../../model/menu';
import { MatCheckboxChange } from '@angular/material/checkbox';

const mode: SongType = SongType.HYMNS;
const title: string = 'Bratrské písně';

@Component({
  selector: 'app-hymns-songs',
  templateUrl: './hymns.component.html',
  styleUrls: ['./hymns.component.css'],
})
export class HymnsComponent implements OnInit {
  public hymns: Song[] = [];
  public title: string = title;
  public mode = mode;
  public menuItems: MenuItem[] = [];
  public showOnlyRehearsed = false;

  constructor(
    private songsOp: HymnsService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('hymns', 'visited');
    this.menuItems = this.menuService
      .getMenuItems()
      .filter((item) => item.title !== this.title);
    this.fetchData();
  }

  async fetchData() {
    try {
      this.hymns = await firstValueFrom(this.songsOp.getAllSongs());
      if (this.showOnlyRehearsed) {
        this.hymns = this.hymns.filter((song) =>
          song.records.some((record) => record.date.getFullYear() < 2022)
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  onCheckboxChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.hymns = this.hymns.filter((song) =>
        song.records.some((record) => record.date.getFullYear() < 2022)
      );
    } else {
      this.fetchData();
    }
  }
}
