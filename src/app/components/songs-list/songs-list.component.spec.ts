import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsListComponent } from './songs-list.component';

describe('NewcomponentComponent', () => {
  let component: SongsListComponent;
  let fixture: ComponentFixture<SongsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SongsListComponent]
    });
    fixture = TestBed.createComponent(SongsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
