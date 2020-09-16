import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MockService } from 'ng-mocks';
import { MomentModule } from 'ngx-moment';
import { of } from 'rxjs';
import { FullNamePipe } from 'src/app/pipes/full-name.pipe';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MeetingsService } from 'src/app/services/meetings.service';
import { UsersService } from 'src/app/services/users.service';
import { CreateMeettingComponent } from './create-meetting.component';

describe('CreateMeettingComponent', () => {
  let component: CreateMeettingComponent;
  let fixture: ComponentFixture<CreateMeettingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMeettingComponent, FullNamePipe],
      imports: [
        RouterModule,
        MomentModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
        NgbTimepickerModule
      ],
      providers: [
        { provide: Router, useValue: MockService(Router) },
        { provide: MeetingsService, useValue: MockService(MeetingsService) },
        { provide: UsersService, useValue: MockService(UsersService) },
        { provide: ConfigurationService, useValue: MockService(ConfigurationService) },
      ]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    const meetings = await import('../../../test-data/meetings.json');
    const users = await import('../../../test-data/users.json');
    fixture = TestBed.createComponent(CreateMeettingComponent);
    component = fixture.componentInstance;
    const userService = fixture.debugElement.injector.get(UsersService);
    spyOn(userService, 'getUser').and.returnValue(of(users.default[0]));
    spyOn(userService, 'getUsers').and.returnValue(of(users.default));
    const meetingService = fixture.debugElement.injector.get(MeetingsService);
    spyOn(meetingService, 'getMeetings').and.returnValue(of(meetings.default));
    const condigurationService = fixture.debugElement.injector.get(ConfigurationService);
    spyOnProperty(condigurationService, 'configuration').and.returnValue({ endWorkingHours: 10, startWorkingHours: 5 });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
