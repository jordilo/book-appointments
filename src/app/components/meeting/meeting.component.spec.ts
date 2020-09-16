import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import moment from 'moment';
import { MomentModule } from 'ngx-moment';
import { FullNamePipe } from 'src/app/pipes/full-name.pipe';
import { MeetingComponent } from './meeting.component';

describe('MeetingComponent', () => {
  let component: MeetingComponent;
  let fixture: ComponentFixture<MeetingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingComponent , FullNamePipe],
      imports: [MomentModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingComponent);
    component = fixture.componentInstance;
    component.meeting = {
      attendants: [1, 2],
      end: moment().add(1, 'hours').format(),
      id: 1,
      name: 'Meeting name',
      start: moment().format(),
      user: {
        id: 1,
        lastname: 'lastname',
        name: 'name',
      },
      userId: 1
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
