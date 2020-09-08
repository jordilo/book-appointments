import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { User } from 'src/definitions/user';
import { UsersServiceService } from '../../services/users-service.service';
import { MeetingsServiceService } from '../../services/meetings-service.service';
import { MeetingsExtended } from '../../services/meetings';
import { Observable, Subscription, merge, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-create-meetting',
  templateUrl: './create-meetting.component.html',
  styleUrls: ['./create-meetting.component.scss']
})
export class CreateMeettingComponent implements OnInit {

  public form: FormGroup;
  public users: FormArray;
  public users$: Observable<User[]>;
  public date = new Date();
  private formSubscription: Subscription;
  private meetings: MeetingsExtended[];

  constructor(
    private fb: FormBuilder,
    private usersServices: UsersServiceService,
    private meetingServices: MeetingsServiceService
  ) { }

  ngOnInit(): void {
    this.users$ = this.usersServices.getUsers();
    this.meetingServices.getMeetings()
      .subscribe((meetings) => this.meetings = meetings);

    zip(this.usersServices.getUser(), this.usersServices.getUsers())
      .pipe(map(([user, users]) => this.createForm(user, users)))
      .subscribe((form) => this.form = form);
  }

  public onSelectUser(user: User, value: boolean) {
    let attendants = this.form.getRawValue().attendants;
    if (value) {
      attendants.push(user.id);
    } else {
      attendants = attendants.filter((userId) => userId !== user.id);
    }

    this.form.setControl('attendants', this.fb.array(attendants));
  }

  public onChangeSingle(data: any) {
    console.log(data);

  }

  private createForm(user: User, users: User[]) {

    this.users = this.fb.array(users.map(u => ({ value: false, disabled: u.id === user.id })));
    const form = this.fb.group({
      name: ['', Validators.required],
      userId: user.id,
      attendants: this.fb.array([user.id]),
      start: [moment(), Validators.required],
      end: [moment().add(1, 'hours'), Validators.required]
    });

    this.formSubscription = form.valueChanges
      .subscribe((values) => {
        console.log(this.form.getRawValue());
      });
    return form;
  }
}
