import { Injectable } from '@angular/core';
import { MenuItem } from '../model/menu';

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
  },
  {
    title: "Zpravodaj",
    icon: "book",
    url: "/newsletter",
    openNewTab: false,
    newFeature: localStorage.getItem("newsletter") === null
  },
  {
    title: "Oznámení",
    icon: "calendar_today",
    url: "/announcements",
    openNewTab: false,
    newFeature: localStorage.getItem("announcements") === null
  },
  {
    title: "Statistika",
    icon: "analytics",
    url: "/statistics",
    openNewTab: false,
    newFeature: localStorage.getItem("statistics") === null
  }
]

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenuItems(): MenuItem[] {
    return menuItems
  }
}
