import { Component } from '@angular/core';
import { MenuItem } from 'src/app/model/menu';

const menuItems: MenuItem[] = [
  {
    title: "Bratrské písně",
    icon: "menu_book",
    url: "/songs/hymns",
    openNewTab: false,
    newFeature: localStorage.getItem("hymns") === null
  },
  {
    title: "Chvály",
    icon: "music_note",
    url: "/songs/worship",
    openNewTab: false,
    newFeature: false
  }
]

const title: string = "Zpravodaj"

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {
  public title: string = title;
  public menuItems = menuItems;
  
  itemHasNewFeature(item: MenuItem): boolean {
    return item.newFeature;
  }
}
