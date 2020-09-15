import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Moment } from 'moment';

@Component({
  selector: 'app-week-selector',
  styleUrls: ['./week-selector.component.scss'],
  templateUrl: './week-selector.component.html',
})
export class WeekSelectorComponent {

  @Input() public from!: Moment;

  @Input() public to!: Moment;
  @Output() public changeDate = new EventEmitter<{ year: string, week: string }>();


  public previousWeek(): void {
    const date = this.from.clone().add(-1, 'week');
    this.changeDate.emit({ year: date.year().toString(), week: date.week().toString() });
  }
  public nextWeek(): void {
    const date = this.from.clone().add(1, 'week');
    this.changeDate.emit({ year: date.year().toString(), week: date.week().toString() });
  }

}
