import { Observable } from 'rxjs';
import { UsersServiceService } from './../../services/users-service.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/definitions/user';

@Component({
  selector: 'app-users-availability',
  templateUrl: './users-availability.component.html',
  styleUrls: ['./users-availability.component.scss']
})
export class UsersAvailabilityComponent implements OnInit {

  public users$: Observable<User[]>;
  constructor(private usersService: UsersServiceService) { }

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers();
  }

}
