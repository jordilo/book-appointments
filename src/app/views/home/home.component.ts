import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MeetingsServiceService } from 'src/app/services/meetings-service.service';
import { ORDER } from 'src/app/services/api-helpers';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MeetingsExtended } from 'src/app/services/meetings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public meetings$: Observable<MeetingsExtended[]>;

  public orderKeys: ORDER[] = ['asc', 'desc'];
  public form: FormGroup;
  private formSubscription: Subscription;
  private currentSort: ORDER = 'asc';

  constructor(private meetingsService: MeetingsServiceService, private fb: FormBuilder) { }

  public ngOnInit() {
    this.form = this.fb.group({ order: 'asc' });
    this.formSubscription = this.form.valueChanges.subscribe(({ order }) => {
      this.currentSort = order;
      this.meetings$ = this.meetingsService.getMeetings('start', this.currentSort);
    });
    this.meetings$ = this.meetingsService.getMeetings('start', this.currentSort);
  }

  public ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

  public trackByFn(index: number, meeting: MeetingsExtended) {
    return meeting.id;
  }

}
