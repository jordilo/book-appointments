import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ConfigurationService } from './services/configuration.service';
import { MeetingsService } from './services/meetings.service';

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: MeetingsService, useValue: MockService(MeetingsService) },
        { provide: ConfigurationService, useValue: MockService(ConfigurationService) },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    const meetingService = fixture.debugElement.injector.get(MeetingsService);
    spyOn(meetingService, 'getMeetings').and.returnValue(of());
    const condigurationService = fixture.debugElement.injector.get(ConfigurationService);
    spyOn(condigurationService, 'getConfiguration').and.returnValue(of());

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

});
