import { TestBed } from '@angular/core/testing';

import { MeetingsService } from './meetings.service';

describe('MeetingsServiceService', () => {
  let service: MeetingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
