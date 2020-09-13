import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Meeting } from 'src/definitions/meeting';
import { ORDER } from './api-helpers';
import { MeetingsExtended, MeetingSort } from './meetings';

function validate(start: Date, end: Date, meeting: Meeting): boolean {
  return (new Date(start) >= new Date(meeting.start) && new Date(start) < new Date(meeting.end))
    || (new Date(end) > new Date(meeting.start) && new Date(end) <= new Date(meeting.end))
    || (new Date(start) < new Date(meeting.start) && new Date(end) > new Date(meeting.end));
}

@Injectable({
  providedIn: 'root'
})
export class MeetingsServiceService {

  private readonly CRUD_BASE = 'meetings';

  private meetings: Meeting[] = [];
  constructor(private http: HttpClient) {
  }

  /**
   * Returns an obserable with all meetings
   * @param field field to sort ( "id" | "userId" | "attendants" | "name" | "start" | "end")
   * @param order  order (asc or desc)
   */
  public getMeetings(field: MeetingSort = 'start', order: ORDER = 'asc'): Observable<MeetingsExtended[]> {
    return this.http.get<MeetingsExtended[]>(`${this.CRUD_BASE}/?_expand=user&_sort=${field}&_order=${order}`)
      .pipe(tap(meetings => this.meetings = meetings));
  }
  /**
   * Add a meeting
   * @param meeting meeting to be add
   */
  public postMeetings(meeting: Meeting): Observable<MeetingsExtended[]> {
    return this.http.post<MeetingsExtended[]>(`${this.CRUD_BASE}`, meeting)
      .pipe(tap(() => this.getMeetings().subscribe()));
  }

  public getMeetingsByUserId(userId: string): Observable<Meeting[]> {
    return this.getMeetingsByUsers([userId]);
  }
  public getMeetingsByUsers(usesrId: string[]): Observable<Meeting[]> {
    return of(this.meetings)
      .pipe(map(meeting => meeting.filter((m) => {
        return usesrId.some(uid => Number(uid) === m.userId || m.attendants.indexOf(Number(uid)) !== -1);
      })));
  }
  public isSomeMeetingOverlapped(start: Date, end: Date): boolean {
    return this.meetings.some(meeting => validate(start, end, meeting));
  }

  public getOverlappedMeetings(start: Date, end: Date): Meeting[] {
    return this.meetings.filter(meeting => validate(start, end, meeting));
  }
}
