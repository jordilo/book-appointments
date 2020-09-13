import { Component, OnInit } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeetingsServiceService } from './services/meetings-service.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  public readyData$!: Observable<boolean>;

  constructor(private readonly _meetingService: MeetingsServiceService) { }
  public ngOnInit(): void {
    this.readyData$ = zip(this._meetingService.getMeetings())
      .pipe(map(() => true)) as Observable<boolean>;
  }

}
