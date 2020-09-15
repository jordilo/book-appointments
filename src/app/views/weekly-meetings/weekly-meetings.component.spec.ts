import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeeklyMeetingsComponent } from './weekly-meetings.component';

describe('WeeklyMeetingsComponent', () => {
  let component: WeeklyMeetingsComponent;
  let fixture: ComponentFixture<WeeklyMeetingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyMeetingsComponent]
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
