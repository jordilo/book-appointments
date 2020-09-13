import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from './api-url';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  constructor(@Inject(BASE_API_URL) private readonly _apiUrl: string) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const apiReq = req.clone({ url: `${this._apiUrl}${req.url}` });
    return next.handle(apiReq);
  }
}
