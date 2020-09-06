import { TestBed } from '@angular/core/testing';

import { MeetingsServiceService } from './meetings-service.service';

describe('MeetingsServiceService', () => {
  let service: MeetingsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
