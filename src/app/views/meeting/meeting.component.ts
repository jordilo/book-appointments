import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MeetingsExtended } from 'src/app/services/meetings';
import { MeetingsServiceService } from 'src/app/services/meetings.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { User } from 'src/definitions/user';

@Component({
  selector: 'app-meeting-view',
  styleUrls: ['./meeting.component.scss'],
  templateUrl: './meeting.component.html',
})
export class MeetingViewComponent implements OnInit {

  public meeting$!: Observable<MeetingsExtended>;

  private users: User[] = [];
  constructor(
    private readonly _meetings: MeetingsServiceService,
    private readonly _users: UsersServiceService,
    private readonly _route: ActivatedRoute) { }

  public ngOnInit(): void {
    this._users.getUsers().subscribe((users) => this.users = users);

    this.meeting$ = this._route.params
      .pipe(switchMap(({ id }) => this._meetings.getMeetingById(Number(id))));
  }

  public getUser(userId: number): User {
    return this.users.find(u => u.id === userId) as User;
  }
  public trackByFn(_index: number, userId: number): number {
    return userId;
  }

}
