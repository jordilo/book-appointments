import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityByUserComponent } from './availability-by-user.component';

describe('AvailabilityByUserComponent', () => {
  let component: AvailabilityByUserComponent;
  let fixture: ComponentFixture<AvailabilityByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabilityByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
