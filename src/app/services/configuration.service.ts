import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Configuration } from './../../definitions/configuration.d';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  public get configuration(): Configuration {
    return this._configuration;
  }
  private readonly CRUD_BASE = 'configuration';
  private _configuration!: Configuration;
  constructor(private readonly _http: HttpClient) { }

  public getConfiguration(): Observable<Configuration> {
    return this._http.get<Configuration>(this.CRUD_BASE)
      .pipe(tap(configuration => this._configuration = configuration));
  }
}
