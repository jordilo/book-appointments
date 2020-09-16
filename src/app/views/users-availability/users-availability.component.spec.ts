import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { FullNamePipe } from 'src/app/pipes/full-name.pipe';
import { UsersService } from './../../services/users.service';
import { UsersAvailabilityComponent } from './users-availability.component';

describe('UsersAvailabilityComponent', () => {
  let component: UsersAvailabilityComponent;
  let fixture: ComponentFixture<UsersAvailabilityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UsersAvailabilityComponent, FullNamePipe],
      providers: [
        { provide: UsersService, useValue: MockService(UsersService) },
      ]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    const users = await import('../../../test-data/users.json');
    fixture = TestBed.createComponent(UsersAvailabilityComponent);
    component = fixture.componentInstance;
    const userService = fixture.debugElement.injector.get(UsersService);
    spyOn(userService, 'getUsers').and.returnValue(of(users.default));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
