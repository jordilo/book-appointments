import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAvailabilityComponent } from './users-availability.component';

describe('UsersAvailabilityComponent', () => {
  let component: UsersAvailabilityComponent;
  let fixture: ComponentFixture<UsersAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
