import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { Configuration } from './../../definitions/configuration.d';
import { ConfigurationService } from './configuration.service';


describe('ConfigurationService', () => {
  let service: ConfigurationService;
  let httpClieckMock: HttpClient;
  let getSpy: jasmine.Spy;
  beforeEach(() => {
    httpClieckMock = MockService(HttpClient);

    getSpy = spyOn(httpClieckMock, 'get')
      .and.returnValue(of({ endWorkingHours: 10, startWorkingHours: 5 } as Configuration));
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClieckMock }]
    });
    service = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when call getCOnfiguration then http is called with correct url', () => {
    service.getConfiguration().subscribe();
    expect(getSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalledWith('configuration');
  });
  it('when there are values catched then configuration return these values', () => {
    service.getConfiguration().subscribe();
    expect(service.configuration).toEqual({ endWorkingHours: 10, startWorkingHours: 5 });
  });
});
