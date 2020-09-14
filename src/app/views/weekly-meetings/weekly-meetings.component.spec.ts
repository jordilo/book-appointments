import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyMeetingsComponent } from './weekly-meetings.component';

describe('WeeklyMeetingsComponent', () => {
  let component: WeeklyMeetingsComponent;
  let fixture: ComponentFixture<WeeklyMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
