import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import moment from 'moment';
import { MomentModule } from 'ngx-moment';
import { WeekSelectorComponent } from './week-selector.component';

describe('WeekSelectorComponent', () => {
  let component: WeekSelectorComponent;
  let fixture: ComponentFixture<WeekSelectorComponent>;
  let element: HTMLElement;

  let emitSpy: jasmine.Spy;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WeekSelectorComponent],
      imports: [MomentModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekSelectorComponent);
    component = fixture.componentInstance;
    component.from = moment();
    component.to = moment().add(1, 'weeks');
    element = fixture.nativeElement;
    emitSpy = spyOn(component.changeDate, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when previous then emit is called with correct params', () => {
    const year = moment().add(-1, 'weeks').year().toString();
    const week = moment().add(-1, 'weeks').week().toString();
    (element.querySelector('.t-previous') as HTMLButtonElement).click();
    expect(emitSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith({ year, week });
  });
  it('when click then emit is called with correct params', () => {
    const year = moment().add(1, 'weeks').year().toString();
    const week = moment().add(1, 'weeks').week().toString();
    (element.querySelector('.t-next') as HTMLButtonElement).click();
    expect(emitSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith({ year, week });
  });
});
