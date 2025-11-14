import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MenuItem } from 'src/app/model/menu';
import { IcalService } from 'src/app/services/calendar.service';
import { MenuService } from 'src/app/services/menu.service';

const title: string = 'Oznámení';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent implements OnInit {
  public title: string = title;
  public menuItems: MenuItem[] = [];
  public fetchingData: boolean = false;
  public errorMessage: string | undefined = undefined;
  public events: any[] = [];
  public birthdays: any[] = [];

  constructor(
    private menuService: MenuService,
    private icalService: IcalService
  ) {}

  async ngOnInit(): Promise<void> {
    localStorage.setItem('announcements', 'seen');
    this.menuItems = this.menuService
      .getMenuItems()
      .filter((item) => item.title !== this.title);
    this.fetchData();
  }

  async fetchData() {
    try {
      this.fetchingData = true;
      this.events = await firstValueFrom(this.icalService.getEvents());
      this.birthdays = await firstValueFrom(this.icalService.getBirthdays());
    } catch (err) {
      console.error(err);
      this.errorMessage = "Při načítání dat dolšo k chybě!"
    } finally {
      this.fetchingData = false;
    }
  }

  itemHasNewFeature(item: MenuItem): boolean {
    return item.newFeature;
  }
}
