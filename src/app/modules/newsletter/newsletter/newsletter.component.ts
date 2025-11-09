import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu';
import { MenuService } from 'src/app/services/menu.service';

const title: string = "Zpravodaj"

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  public title: string = title;
  public menuItems: MenuItem[] = [];
  
  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("newsletter", "seen");
    this.menuItems = this.menuService
      .getMenuItems()
      .filter((item) => item.title !== this.title);
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
