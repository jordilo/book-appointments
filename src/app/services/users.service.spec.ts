import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpClieckMock: HttpClient;
  let getSpy: jasmine.Spy;
  beforeEach(async () => {
    const users = await import('../../test-data/users.json');
    httpClieckMock = MockService(HttpClient);
    getSpy = spyOn(httpClieckMock, 'get')
      .and.returnValue(of(users.default));
    TestBed.configureTestingModule({ providers: [{ provide: HttpClient, useValue: httpClieckMock }] });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('when getUser then http get is called properly' , () => {
    service.getUser();
    expect(getSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalledWith('users/1');
  });
  it('when getUsers then http get is called properly' , () => {
    service.getUsers();
    expect(getSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalledWith('users');
  });
  it('when getUserById then http get is called properly' , () => {
    service.getUserById(56);
    expect(getSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalledWith('users/56');
  });
});
