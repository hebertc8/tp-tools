import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private coookieService: CookieService, private route: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookieExists: boolean = this.coookieService.check('tp_cookie')
    if (!cookieExists && localStorage.getItem('info') === null && localStorage.getItem('document') === null){
      return true;
    }else {
      this.route.navigate(['home'])
      return false;
    }

  }

}
