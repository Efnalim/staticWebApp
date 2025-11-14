import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AnnouncementsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AnnouncementsRoutingModule,
  ]
})
export class AnnouncementsModule { }
