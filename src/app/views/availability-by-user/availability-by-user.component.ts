import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MeetingsServiceService } from 'src/app/services/meetings-service.service';
import { Meeting } from 'src/definitions/meeting';
import { User } from 'src/definitions/user';
import { UsersServiceService } from './../../services/users-service.service';

@Component({
  selector: 'app-availability-by-user',
  styleUrls: ['./availability-by-user.component.scss'],
  templateUrl: './availability-by-user.component.html',
})
export class AvailabilityByUserComponent implements OnInit {

  public currentUser$!: Observable<User>;
  public meetings$!: Observable<Meeting[]>;
  constructor(
    private router: ActivatedRoute,
    private usersService: UsersServiceService,
    private meetingsService: MeetingsServiceService,

  ) { }

  public ngOnInit(): void {
    this.currentUser$ = this.router.params
      .pipe(switchMap(({ id }) => this.usersService.getUserById(id)));
    this.meetings$ = this.router.params
      .pipe(switchMap(({ id }) => this.meetingsService.getMeetingsByUserId(id)));
  }

}
