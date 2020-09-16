import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MockComponent, MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { MeetingsComponent } from 'src/app/components/meetings/meetings.component';
import { FullNamePipe } from 'src/app/pipes/full-name.pipe';
import { MeetingsService } from 'src/app/services/meetings.service';
import { UsersService } from 'src/app/services/users.service';
import { AvailabilityByUserComponent } from './availability-by-user.component';

describe('AvailabilityByUserComponent', () => {
  let component: AvailabilityByUserComponent;
  let fixture: ComponentFixture<AvailabilityByUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AvailabilityByUserComponent, FullNamePipe , MockComponent(MeetingsComponent)],
      imports: [RouterModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            params: of({ id: 9 })
          }
        },
        { provide: MeetingsService, useValue: MockService(MeetingsService) },
        { provide: UsersService, useValue: MockService(UsersService) },
      ]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    const meetings = await import('../../../test-data/meetings.json');
    const users = await import('../../../test-data/users.json');
    fixture = TestBed.createComponent(AvailabilityByUserComponent);
    component = fixture.componentInstance;
    const userService = fixture.debugElement.injector.get(UsersService);
    spyOn(userService, 'getUserById').and.returnValue(of(users.default[0]));
    const meetingService = fixture.debugElement.injector.get(MeetingsService);
    spyOn(meetingService, 'getMeetingsByUserId').and.returnValue(of(meetings.default));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
