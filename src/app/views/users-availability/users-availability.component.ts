import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/definitions/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-availability',
  styleUrls: ['./users-availability.component.scss'],
  templateUrl: './users-availability.component.html',
})
export class UsersAvailabilityComponent implements OnInit {

  public users$!: Observable<User[]>;
  constructor(private readonly _usersService: UsersService) { }

  public ngOnInit(): void {
    this.users$ = this._usersService.getUsers();
  }
  public trackByFn(_index: number, user: User): number {
    return user.id;
  }
}
