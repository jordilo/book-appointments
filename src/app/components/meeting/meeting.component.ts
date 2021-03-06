import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MeetingsExtended } from 'src/app/services/meetings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-meeting',
  styleUrls: ['./meeting.component.scss'],
  templateUrl: './meeting.component.html',
})
export class MeetingComponent {
  @Input() public meeting!: MeetingsExtended;
}
