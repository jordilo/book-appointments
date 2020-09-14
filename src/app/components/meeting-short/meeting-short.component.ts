import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MeetingsExtended } from 'src/app/services/meetings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-meeting-short',
  styleUrls: ['./meeting-short.component.scss'],
  templateUrl: './meeting-short.component.html',
})
export class MeetingShortComponent implements OnInit {


  @Input() public meeting!: MeetingsExtended;
  constructor() { }

  public ngOnInit(): void {
  }

}
