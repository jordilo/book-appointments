import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import moment from 'moment';
import { Observable } from 'rxjs';
import { MeetingsServiceService } from 'src/app/services/meetings-service.service';
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

  public daysData!: MeetingsByDay[];
  constructor(
    private readonly _meetings: MeetingsServiceService,
    private readonly _users: UsersServiceService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router) { }

  public ngOnInit(): void {

    this.users$ = this._users.getUsers();
    this._route.params
      .subscribe(({ year, week }) => {
        const newWeek = moment({ year: Number(year) }).startOf('week').isoWeek(Number(week));
        this.from = newWeek.clone();
        this.to = newWeek.clone().add(6, 'days');

        this.daysData = [...Array(7).keys()].map(index => {
          const day = moment(this.from).clone().add(index, 'days');
          return {
            day: day.format(),
            meetings: this._meetings.meetings.filter(m => moment(m.start).format('YYYY-MM-DD') === day.format('YYYY-MM-DD'))
          } as unknown as MeetingsByDay;
        });

      });
  }
  public onChangeDate({ year, week }: { year: string, week: string }): void {
    this._router.navigate(['weekly-meetings', year, week]);
  }

}
