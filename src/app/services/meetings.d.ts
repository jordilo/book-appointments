import { Meeting } from 'src/definitions/meeting';
import { User } from './../../definitions/user.d';
export interface MeetingsExtended extends Meeting {
  user: User;
}

export type MeetingSort = keyof Meeting;
