import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private swUpdate: SwUpdate,
  ) {
    if (this.swUpdate.isEnabled) {
      setInterval(() => {
        this.swUpdate.checkForUpdate().then(() => {
        })
      }, 60000);
    }
    this.swUpdate.versionUpdates.subscribe(() => {
      location.reload();
    });
  }

  private user: any;
  title = 'app';

  public ngOnInit() {
    
  }
}
