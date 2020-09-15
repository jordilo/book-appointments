import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import moment from 'moment';
import { MeetingsByDay, MeetingsExtended } from 'src/app/services/meetings';
import { Meeting } from 'src/definitions/meeting';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-meetings',
  styleUrls: ['./meetings.component.scss'],
  templateUrl: './meetings.component.html',
})
export class MeetingsComponent implements OnInit, OnChanges {

  @Input() public meetings!: MeetingsExtended[];

  public meetingsByDay!: MeetingsByDay[];
  constructor() { }
  public ngOnChanges(changes: SimpleChanges): void {

    this.meetingsByDay = _.chain(changes.meetings.currentValue)
      .groupBy(meeting => moment(meeting.start).format('YYYY-MM-DD'))
      .map((meetings: Meeting[], day) => ({ day, meetings } as MeetingsByDay))
      .value() as unknown as MeetingsByDay[];
  }

  public ngOnInit(): void {
  }

  public trackByFn(_index: number, meeting: Meeting): number {
    return meeting.id;
  }

}
