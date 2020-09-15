import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeekSelectorComponent } from './week-selector.component';

describe('WeekSelectorComponent', () => {
  let component: WeekSelectorComponent;
  let fixture: ComponentFixture<WeekSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WeekSelectorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
