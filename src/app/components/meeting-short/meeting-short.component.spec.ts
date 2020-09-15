import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeetingShortComponent } from './meeting-short.component';

describe('MeetingShortComponent', () => {
  let component: MeetingShortComponent;
  let fixture: ComponentFixture<MeetingShortComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
