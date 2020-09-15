import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import moment from 'moment';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MeetingsServiceService } from 'src/app/services/meetings.service';
import { Meeting } from 'src/definitions/meeting';
import { User } from 'src/definitions/user';
import { MeetingsByDay } from './../../services/meetings.d';
import { UsersServiceService } from './../../services/users-service.service';

@Component({
  selector: 'app-weekly-meetings',
  styleUrls: ['./weekly-meetings.component.scss'],
  templateUrl: './weekly-meetings.component.html',
})
export class WeeklyMeetingsComponent implements OnInit {

  public from!: Moment;
  public to!: Moment;

  public users$!: Observable<User[]>;

  public usersToSelect: number[] = [];

  public daysData!: MeetingsByDay[];

  public hours!: string[];
  private _params!: string[];
  public readonly PIXEL_PER_HOUR = 100 / 60;
  constructor(
    private readonly _meetings: MeetingsServiceService,
    private readonly _users: UsersServiceService,
    private readonly _configurationService: ConfigurationService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router) { }

  public ngOnInit(): void {
    const startTime = this._configurationService.configuration.startWorkingHours;
    const endTime = this._configurationService.configuration.endWorkingHours;

    this.hours = [...Array((endTime - startTime + 1) * 2).keys()].map((index) => {
      const hour = startTime + (index / 2);
      const isClock = (((startTime + (index / 2)) * 10) % 10 === 0);
      const minute = isClock ? 0 : 30;
      return moment({ hour, minute }).format('LT');
    });
    this.users$ = this._users.getUsers();
    this._route.params
      .subscribe(({ year, week }) => this.calculateMeetings(year, week));
  }
  public onChangeDate({ year, week }: { year: string, week: string }): void {
    this._router.navigate(['weekly-meetings', year, week]);
  }
  public calculateHeight(meeting: Meeting): number {
    return this.PIXEL_PER_HOUR * moment(meeting.end).diff(moment(meeting.start), 'minutes');
  }
  public calculateMarginTop(meeting: Meeting): number {
    const start = moment(meeting.start).hour(this._configurationService.configuration.startWorkingHours);
    return this.PIXEL_PER_HOUR * Math.abs(start.diff(moment(meeting.start), 'minutes'));
  }

  public selectUser(userId: number): void {
    const position = this.usersToSelect.indexOf(userId);
    if (position === -1) {
      this.usersToSelect.push(userId);
    } else {
      this.usersToSelect.splice(position, 1);
    }
    this.calculateMeetings(this._params[0], this._params[1]);
  }
  public trackByUser(_index: number, user: User): number {
    return user.id;
  }
  public trackByHour(_index: number, hour: string): string {
    return hour;
  }
  public trackByMeeting(_index: number, meeting: Meeting): number {
    return meeting.id;
  }

  private calculateMeetings(year: string, week: string): void {
    this._params = [year, week];
    const newWeek = moment({ year: Number(year) }).startOf('week').isoWeek(Number(week));
    this.from = newWeek.clone();
    this.to = newWeek.clone().add(6, 'days');
    const meetings = this._meetings.getMeetingsByUsers(this.usersToSelect, this._meetings.meetings);
    this.daysData = [...Array(7).keys()].map(index => {
      const day = moment(this.from).clone().add(index, 'days');
      return {
        day: day.format(),
        meetings: meetings.filter(m => moment(m.start).format('YYYY-MM-DD') === day.format('YYYY-MM-DD'))
      } as unknown as MeetingsByDay;
    });
  }
}
