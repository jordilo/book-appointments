import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleChange } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { MeetingsExtended } from 'src/app/services/meetings';
import { MeetingComponent } from '../meeting/meeting.component';
import { MeetingsComponent } from './meetings.component';

describe('MeetingsComponent', () => {
  let component: MeetingsComponent;
  let fixture: ComponentFixture<MeetingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingsComponent, MeetingComponent],
      imports: [MomentModule]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    const meetings = await import('../../../test-data/meetings.json');
    fixture = TestBed.createComponent(MeetingsComponent);
    component = fixture.componentInstance;
    component.meetings = meetings.default as MeetingsExtended[];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when meetings change then meetings by day are recalculated', () => {
    const meetings = new SimpleChange(component.meetings, [], false);
    component.ngOnChanges({ meetings });
    fixture.detectChanges();
    expect(component.meetingsByDay.length).toBe(0);
  });
});
