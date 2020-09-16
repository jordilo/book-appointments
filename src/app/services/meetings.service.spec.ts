import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { Meeting } from 'src/definitions/meeting';
import { MeetingsService } from './meetings.service';

describe('MeetingsServiceService', () => {
  let service: MeetingsService;
  let httpClieckMock: HttpClient;
  let getSpy: jasmine.Spy;
  let postSpy: jasmine.Spy;
  beforeEach(async () => {
    const meetings = await import('../../test-data/meetings.json');
    httpClieckMock = MockService(HttpClient);
    getSpy = spyOn(httpClieckMock, 'get')
      .and.returnValue(of(meetings.default));
    postSpy = spyOn(httpClieckMock, 'post')
      .and.returnValue(of(true));
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClieckMock }]
    });
    service = TestBed.inject(MeetingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('when getMeetings then url is called properly ', () => {
    service.getMeetings().subscribe();
    expect(getSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalledWith(`meetings/?_expand=user&_sort=start&_order=asc`);
  });
  it('when getMeetingById then url is called properly', () => {
    service.getMeetingById(4).subscribe();
    expect(getSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalledWith(`meetings/4?_expand=user`);
  });
  it('when getMeetingById then url is called properly', () => {
    service.postMeetings({ name: 'kkk', start: '2020', end: '2021' } as Meeting).subscribe();
    expect(postSpy).toHaveBeenCalled();
    expect(postSpy).toHaveBeenCalledWith(`meetings`, { name: 'kkk', start: '2020', end: '2021' });
    expect(getSpy).toHaveBeenCalled();
  });
});
