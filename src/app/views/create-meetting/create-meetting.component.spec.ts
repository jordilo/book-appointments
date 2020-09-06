import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeettingComponent } from './create-meetting.component';

describe('CreateMeettingComponent', () => {
  let component: CreateMeettingComponent;
  let fixture: ComponentFixture<CreateMeettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMeettingComponent ]
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
