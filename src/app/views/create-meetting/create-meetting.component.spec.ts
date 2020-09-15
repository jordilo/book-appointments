import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateMeettingComponent } from './create-meetting.component';

describe('CreateMeettingComponent', () => {
  let component: CreateMeettingComponent;
  let fixture: ComponentFixture<CreateMeettingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMeettingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMeettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
