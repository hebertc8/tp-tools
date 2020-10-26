import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})


export class ErrorInterceptorService implements HttpInterceptor {
  private subscriptionRefresh: Subscription;
  private refreshToken;
  constructor(private user:ApiService, private router:Router) { }

  intercept(user: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(user).pipe(catchError(err => {
      this.refreshToken = this.user.getUser().refreshToken;

      if (err.error.code === 400) {

        this.subscriptionRefresh = this.user.refreshSession(this.refreshToken).subscribe(res => {

          if (this.user.relogin(res)) {
          } else {
            this.logout('Error reactivando sesión.');
          }

        });
      } else if (err.error.code === 401) {
        this.logout('Sesión expirada.');
      }

      const error = err.error.message || err.statusText;
      return throwError(error);


    }));
  }

  logout(message) {
    setTimeout(() => {
      this.user.logout();
      this.router.navigate(['/login']);
    }, 1000);
  }
}
