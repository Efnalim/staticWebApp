import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from 'src/app/model/menu';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.css'],
})
export class ListHeaderComponent {
  @Output() reloadRequest = new EventEmitter<boolean>();

  @Input() menuItems: MenuItem[] = [];
  @Input() title: string = "";

  constructor(public dialog: MatDialog) {}
  
  itemHasNewFeature(item: MenuItem): boolean {
    return item.newFeature;
  }
}
