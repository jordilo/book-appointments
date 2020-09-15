import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { Observable, Subscription, zip } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { Meeting } from 'src/definitions/meeting';
import { User } from 'src/definitions/user';
import { MeetingsService } from '../../services/meetings.service';
import { UsersService } from '../../services/users.service';
import { ConfigurationService } from './../../services/configuration.service';

@Component({
  selector: 'app-create-meetting',
  styleUrls: ['./create-meetting.component.scss'],
  templateUrl: './create-meetting.component.html',
})
export class CreateMeettingComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  public users!: FormArray;
  public users$!: Observable<User[]>;
  public date = new Date();
  private formSubscription!: Subscription;
  private readonly DEBOUNCE_TIME_FORM = 250;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _usersServices: UsersService,
    private readonly _meetingServices: MeetingsService,
    private readonly _configurationService: ConfigurationService,
    private readonly _calendar: NgbCalendar,
    private readonly _formatter: NgbDateParserFormatter,
    private readonly _router: Router,
  ) { }

  public ngOnInit(): void {
    this.users$ = this._usersServices.getUsers();

    zip(this._usersServices.getUser(), this.users$, this._meetingServices.getMeetings())
      .pipe(
        map(([user, users]) => this.createForm(user, users)),
        tap((form) => this.form = form)
      )
      .subscribe((form) => {
        const formValues = this.valueAdapterToMeeting(form.getRawValue());
        this.validateForm(formValues.start, formValues.end);
      });
  }

  public ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  public onSelectUser(user: User, value: boolean): void {
    const attendants = this.form.getRawValue().attendants as FormArray;
    if (value) {
      attendants.push(this._fb.control(user.id));
    } else {
      const position = attendants.value.find((userId: number) => userId !== user.id);
      attendants.removeAt(position);
    }
  }

  public addAppointment(): void {
    this._meetingServices.postMeetings(this.valueAdapterToMeeting(this.form.getRawValue()))
      .subscribe(() => this._router.navigate(['']), (err) => alert(err));
  }

  public valueAdapterToMeeting(formValue: any): Meeting {
    const startForm: NgbTimeStruct = formValue.start;
    const start = moment(this._formatter.format(formValue.date)).add(startForm.hour, 'hour').add(startForm.minute, 'minute').format();

    const endForm: NgbTimeStruct = formValue.end;
    const end = moment(this._formatter.format(formValue.date)).add(endForm.hour, 'hour').add(endForm.minute, 'minute').format();

    const meeting: Meeting = {
      attendants: formValue.attendants.value,
      end,
      name: formValue.name,
      start,
      userId: formValue.userId
    } as Meeting;
    return meeting;
  }

  private validateForm(start: string, end: string): boolean {
    const meetingsOverlap = this._meetingServices.isSomeMeetingOverlapped(this.form.value.attendants.value, new Date(start), new Date(end));

    if (meetingsOverlap) {
      this.form.setErrors({ unaivalableTime: 'There are already some meeting in this hours' }, { emitEvent: true });
    }

    return meetingsOverlap;
  }

  private createForm(user: User, users: User[]): FormGroup {

    this.users = this._fb.array(users.map(u => ({ value: u.id === user.id ? true : false, disabled: u.id === user.id })));
    const form = this._fb.group({
      attendants: [this._fb.array([user.id]), Validators.minLength(1)],
      date: this._calendar.getToday(),
      end: [{ hour: 10, minute: 0, second: 0 }, (control: FormControl) => this.validateEnd(control, this.form?.get('start'))],
      name: ['', Validators.required],
      start: [{ hour: 9, minute: 0, second: 0 }, (control: FormControl) => this.validateStart(control, this.form?.get('end'))],
      userId: user.id,
    });
    this.formSubscription = form.valueChanges
      .pipe(
        debounceTime(this.DEBOUNCE_TIME_FORM),
        map(() => this.valueAdapterToMeeting(this.form.getRawValue())),
        tap((values) => this.validateForm(values.start, values.end))
      )
      .subscribe();
    return form;
  }

  private validateStart(control: FormControl, end: AbstractControl | null): any {
    const value: NgbTimeStruct = control.value;
    if (!value || !end) {
      return null;
    }
    end.setErrors(null);
    const endValue: NgbTimeStruct = end.value;
    if (value.hour > endValue.hour || value.hour === endValue.hour && value.minute >= endValue.minute) {
      return { overlapEnd: true };
    }
    if (value.hour < this._configurationService.configuration.startWorkingHours) {
      return { tooEarly: true };
    }
    if (value.hour > this._configurationService.configuration.endWorkingHours && value.minute > 30) {
      return { tooLate: true };
    }

    return null;
  }
  private validateEnd(control: FormControl, start: AbstractControl | null): any {
    const value: NgbTimeStruct = control.value;
    if (!value || !start) {
      return null;
    }
    start.setErrors(null);
    const startValue: NgbTimeStruct = start.value;
    if (value.hour < startValue.hour || value.hour === startValue.hour && value.minute <= startValue.minute) {
      return { overlapStart: true };
    }
    if (value.hour < (this._configurationService.configuration.startWorkingHours + 1) && value.minute < 30
      || value.hour < this._configurationService.configuration.startWorkingHours) {
      return { tooEarly: true };
    }
    if (value.hour > this._configurationService.configuration.endWorkingHours) {
      return { tooLate: true };
    }

    return null;
  }
  public trackByFn(_index: number, user: User): number {
    return user.id;
  }

}
