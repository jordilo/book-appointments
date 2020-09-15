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

  public get meetings(): MeetingsExtended[] {
    return this._meetings as MeetingsExtended[];
  }
  private readonly CRUD_BASE = 'meetings';
  private _meetings: Meeting[] = [];
  constructor(private http: HttpClient) {
  }

  /**
   * Returns an obserable with all meetings
   * @param field field to sort ( "id" | "userId" | "attendants" | "name" | "start" | "end")
   * @param order  order (asc or desc)
   */
  public getMeetings(field: MeetingSort = 'start', order: ORDER = 'asc'): Observable<MeetingsExtended[]> {
    return this.http.get<MeetingsExtended[]>(`${this.CRUD_BASE}/?_expand=user&_sort=${field}&_order=${order}`)
      .pipe(tap(meetings => this._meetings = meetings));
  }
  /**
   * Add a meeting
   * @param meeting meeting to be add
   */
  public postMeetings(meeting: Meeting): Observable<MeetingsExtended[]> {
    return this.http.post<MeetingsExtended[]>(`${this.CRUD_BASE}`, meeting)
      .pipe(tap(() => this.getMeetings().subscribe()));
  }

  public getMeetingById(userId: number): Observable<MeetingsExtended> {
    return this.http.get<MeetingsExtended>(`${this.CRUD_BASE}/${userId}?_expand=user`);
  }

  public getMeetingsByUserId(userId: number): Observable<Meeting[]> {
    return this.getMeetingsByUsers$([userId]);
  }
  public getMeetingsByUsers$(usesrId: number[]): Observable<Meeting[]> {
    return of(this._meetings)
      .pipe(map(meetings => this.getMeetingsByUsers(usesrId, meetings)));
  }
  public isSomeMeetingOverlapped(usersId: number[], start: Date, end: Date): boolean {
    return this.getMeetingsByUsers(usersId, this.meetings).some(meeting => validate(start, end, meeting));
  }

  public getOverlappedMeetings(start: Date, end: Date): Meeting[] {
    return this._meetings.filter(meeting => validate(start, end, meeting));
  }

  public getMeetingsByUsers(usesrId: number[], meetings: Meeting[]): Meeting[] {
    if (!usesrId.length) {
      return meetings;
    }
    return meetings.filter((m) => {
      return usesrId.some(uid => uid === m.userId || m.attendants.indexOf(uid) !== -1);
    });
  }
}
