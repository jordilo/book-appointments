import { tap, switchMap } from 'rxjs/operators';
import { UsersServiceService } from './../../services/users-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/definitions/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-availability-by-user',
  templateUrl: './availability-by-user.component.html',
  styleUrls: ['./availability-by-user.component.scss']
})
export class AvailabilityByUserComponent implements OnInit {

  public currentUser$: Observable<User>;
  constructor(private router: ActivatedRoute, private usersServiceService: UsersServiceService) { }

  ngOnInit(): void {
    this.currentUser$ = this.router.params
      .pipe(switchMap(({ id }) => this.usersServiceService.getUserById(id)));
  }

}
