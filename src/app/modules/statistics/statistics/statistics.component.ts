import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MenuItem } from 'src/app/model/menu';
import { worshipSongsPerformers } from 'src/app/model/song';
import { MenuService } from 'src/app/services/menu.service';
import { SongsService } from 'src/app/services/songs.service';

const title: string = 'Statistika';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  public title: string = title;
  public worshipSongsPerformers = worshipSongsPerformers;
  public menuItems: MenuItem[] = [];
  public records: {
    year: number;
    records: { date: Date; performer: string }[];
  }[] = [];

  constructor(
    private menuService: MenuService,
    private songService: SongsService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('statistics', 'seen');
    this.menuItems = this.menuService
      .getMenuItems()
      .filter((item) => item.title !== this.title);
    this.fetachAndProcesSongs();
  }

  async fetachAndProcesSongs() {
    const songs = await firstValueFrom(this.songService.getAllSongs());
    let hashset = new Map<number, { date: Date; performer: string }>();
    songs.forEach((song) => {
      song.records.forEach((record) => {
        const normalizedDate = this.normalizeDate(record.date)
        if (!hashset.has(normalizedDate.getTime())) {
          hashset.set(normalizedDate.getTime(), record);
        } else {
          // console.log("ignoring: ", normalizedDate, hashset.get(normalizedDate.getTime()));
          
        }
      });
    });
    
    let recordsGroupByYears: {
      year: number;
      records: { date: Date; performer: string }[];
    }[] = [];
    hashset.forEach((record) => {
      let year = record.date.getFullYear();
      let yearSongs = recordsGroupByYears.find(
        (yearSongs) => year === yearSongs.year
      );
      if (yearSongs) {
        yearSongs.records.push(record);
      } else {
        recordsGroupByYears.push({ year: year, records: [record] });
      }
    });
    recordsGroupByYears.forEach(year => year.records.sort((a, b) => (b.date.getTime() - a.date.getTime())));
    this.records = recordsGroupByYears
    // console.table(recordsGroupByYears);
  }

  itemHasNewFeature(item: MenuItem): boolean {
    return item.newFeature;
  }

  normalizeDate(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  getDate(date: Date): string {
    return date.getDate() + "." + (date.getMonth() + 1) + "."
  }

  getBackgroundColor(performer: string): string {
    switch (performer) {
      case "OG": return "rgb(53, 122, 195)"
      case "NG": return "rgb(240, 211, 51)"
      case "MIX": return "rgb(50, 168, 78)"
      case "mládež": return "tomato"
      default: return "rgb(156, 155, 155)";
    }
  }
}
