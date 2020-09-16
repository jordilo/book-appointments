import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import moment from 'moment';
import { MomentModule } from 'ngx-moment';
import { MeetingShortComponent } from './meeting-short.component';

describe('MeetingShortComponent', () => {
  let component: MeetingShortComponent;
  let fixture: ComponentFixture<MeetingShortComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingShortComponent],
      imports: [MomentModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingShortComponent);
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
