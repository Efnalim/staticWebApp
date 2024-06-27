import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Song, SongType } from 'src/app/model/song';
import { HymnsService } from 'src/app/services/hymns.service';
import { MenuService } from 'src/app/services/menu.service';
import { MenuItem } from './../../../model/menu';


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
  public mode = mode;
  public menuItems: MenuItem[] = [];

  constructor(
    private songsOp: HymnsService,
    private menuService: MenuService
  ) {}
  
  ngOnInit(): void {
    localStorage.setItem('hymns', "visited")
    this.menuItems = this.menuService.getMenuItems().filter(item => item.title !== this.title);
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
