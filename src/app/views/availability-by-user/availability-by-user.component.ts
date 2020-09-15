import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MeetingsService } from 'src/app/services/meetings.service';
import { Meeting } from 'src/definitions/meeting';
import { User } from 'src/definitions/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-availability-by-user',
  styleUrls: ['./availability-by-user.component.scss'],
  templateUrl: './availability-by-user.component.html',
})
export class AvailabilityByUserComponent implements OnInit {

  public currentUser$!: Observable<User>;
  public meetings$!: Observable<Meeting[]>;
  constructor(
    private readonly _router: ActivatedRoute,
    private readonly _usersService: UsersService,
    private readonly _meetingsService: MeetingsService,

  ) { }

  public ngOnInit(): void {
    this.currentUser$ = this._router.params
      .pipe(switchMap(({ id }) => this._usersService.getUserById(id)));
    this.meetings$ = this._router.params
      .pipe(switchMap(({ id }) => this._meetingsService.getMeetingsByUserId(Number(id))));
  }

}
