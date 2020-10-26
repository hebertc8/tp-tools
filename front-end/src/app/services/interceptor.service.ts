import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private user: ApiService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = this.user.getUser();


    if (currentUser) {

          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${currentUser.token}`,
              'Access-Control-Allow-Origin': '*',
            },
          });
          return next.handle(request);
    } else {
      console.log(request);
      return next.handle(request);
    }

  }
}
