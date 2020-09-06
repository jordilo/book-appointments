import { Meeting } from './../../../definitions/meeting.d';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MeetingsExtended } from 'src/app/services/meetings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  @Input() public meeting: MeetingsExtended;
  constructor() { }

  public get userFullName(): string {
    return `${this.meeting.user.name} ${this.meeting.user.lastname}`;
  }
  ngOnInit(): void {
  }

}
