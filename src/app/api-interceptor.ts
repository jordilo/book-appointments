import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from './api-url';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  constructor(@Inject(BASE_API_URL)private apiUrl: string) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const apiReq = req.clone({ url: `${this.apiUrl}${req.url}` });
    return next.handle(apiReq);
  }
}
