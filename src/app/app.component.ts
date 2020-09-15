import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigurationService } from './services/configuration.service';
import { MeetingsService } from './services/meetings.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  public readyData$!: Observable<boolean>;
  public year = moment().format('YYYY');
  public week = moment().format('WW');
  constructor(
    private readonly _configurationService: ConfigurationService,
    private readonly _meetingService: MeetingsService) { }
  public ngOnInit(): void {
    this.readyData$ = zip(this._meetingService.getMeetings(), this._configurationService.getConfiguration())
      .pipe(map(() => true)) as Observable<boolean>;
  }

}
