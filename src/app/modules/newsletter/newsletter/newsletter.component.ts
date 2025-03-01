import { Component, OnInit } from '@angular/core';
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
export class NewsletterComponent implements OnInit {
  public title: string = title;
  public menuItems = menuItems;

  ngOnInit(): void {
    localStorage.setItem("newsletter", "seen");
  }
  
  itemHasNewFeature(item: MenuItem): boolean {
    return item.newFeature;
  }

  getNewsletterImage(numberImg: number): string {
    return "assets/images/newsletter/Zpravodaj_" + this.getCurrentMonthNumberAs2charString() + "_" + new Date().getFullYear().toString().slice(2) + "-" + numberImg + ".png"
  }

  getCurrentMonthNumberAs2charString(): string {
    let currentMonthNumber = new Date().getMonth() + 1;
    if (currentMonthNumber < 10)
      return "0" + currentMonthNumber
    return currentMonthNumber.toString();
  }
}
