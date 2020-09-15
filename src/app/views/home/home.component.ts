import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ORDER } from 'src/app/services/api-helpers';
import { MeetingsExtended } from 'src/app/services/meetings';
import { MeetingsService } from 'src/app/services/meetings.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  public meetings$!: Observable<MeetingsExtended[]>;

  public orderKeys: ORDER[] = ['asc', 'desc'];
  public form!: FormGroup;
  private formSubscription!: Subscription;
  private currentSort: ORDER = 'asc';

  constructor(
    private readonly _meetingsService: MeetingsService,
    private readonly _fb: FormBuilder) { }

  public ngOnInit(): void {
    this.form = this._fb.group({ order: 'asc' });
    this.formSubscription = this.form.valueChanges.subscribe(({ order }) => {
      this.currentSort = order;
      this.meetings$ = this._meetingsService.getMeetings('start', this.currentSort);
    });
    this.meetings$ = this._meetingsService.getMeetings('start', this.currentSort);
  }

  public ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  public trackByFn(_index: number, option: string): string {
    return option;
  }
}
