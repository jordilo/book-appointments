import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActivatedRoute, Router } from '@angular/router';
import { MockService } from 'ng-mocks';
import { MomentModule } from 'ngx-moment';
import { of } from 'rxjs';
import { FullNamePipe } from 'src/app/pipes/full-name.pipe';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MeetingsService } from 'src/app/services/meetings.service';
import { UsersService } from 'src/app/services/users.service';
import { WeeklyMeetingsComponent } from './weekly-meetings.component';

describe('WeeklyMeetingsComponent', () => {
  let component: WeeklyMeetingsComponent;
  let fixture: ComponentFixture<WeeklyMeetingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyMeetingsComponent, FullNamePipe],
      imports: [MomentModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            params: of({ year: '2020', week: '27' })
          }
        },
        { provide: Router, useValue: MockService(Router) },
        { provide: ConfigurationService, useValue: MockService(ConfigurationService) },
        { provide: MeetingsService, useValue: MockService(MeetingsService) },
        { provide: UsersService, useValue: MockService(UsersService) }]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    const meetings = await import('../../../test-data/meetings.json');
    const users = await import('../../../test-data/users.json');
    fixture = TestBed.createComponent(WeeklyMeetingsComponent);
    component = fixture.componentInstance;

    const userService = fixture.debugElement.injector.get(UsersService);
    spyOn(userService, 'getUser').and.returnValue(of(users.default[0]));
    spyOn(userService, 'getUsers').and.returnValue(of(users.default));
    const meetingService = fixture.debugElement.injector.get(MeetingsService);
    spyOn(meetingService, 'getMeetingsByUsers').and.returnValue(meetings.default);
    const condigurationService = fixture.debugElement.injector.get(ConfigurationService);
    spyOnProperty(condigurationService, 'configuration').and.returnValue({ endWorkingHours: 10, startWorkingHours: 5 });


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
