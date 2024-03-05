import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}
  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(localStorage.getItem('userToken')!= null)
    {
      const token:any = {token:localStorage.getItem("userToken")};

      request = request.clone({setHeaders:token}); 
    }
    
    return next.handle(request);
  }
}
