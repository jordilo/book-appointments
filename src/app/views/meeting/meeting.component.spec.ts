import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MockService } from 'ng-mocks';
import { MomentModule } from 'ngx-moment';
import { of } from 'rxjs';
import { FullNamePipe } from 'src/app/pipes/full-name.pipe';
import { MeetingsService } from 'src/app/services/meetings.service';
import { UsersService } from 'src/app/services/users.service';
import { MeetingViewComponent } from './meeting.component';

describe('MeetingViewComponent', () => {
  let component: MeetingViewComponent;
  let fixture: ComponentFixture<MeetingViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingViewComponent, FullNamePipe],
      imports: [ MomentModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            params: of({ id: 9 })
          }
        },
        { provide: Router, useValue: MockService(Router) },
        { provide: MeetingsService, useValue: MockService(MeetingsService) },
        { provide: UsersService, useValue: MockService(UsersService) },
      ]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    const meetings = await import('../../../test-data/meetings.json');
    const users = await import('../../../test-data/users.json');
    fixture = TestBed.createComponent(MeetingViewComponent);
    component = fixture.componentInstance;
    const userService = fixture.debugElement.injector.get(UsersService);
    spyOn(userService, 'getUsers').and.returnValue(of(users.default));
    const meetingService = fixture.debugElement.injector.get(MeetingsService);
    spyOn(meetingService, 'getMeetingById').and.returnValue(of(meetings.default[0]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
