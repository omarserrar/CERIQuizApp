import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { SocketServiceService } from '../services/socket-service.service';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotConnectedGuard implements CanActivate {
  constructor(private router : Router, private loginService : LoginService, private socketServiceService: SocketServiceService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginService.isLoggedIn().pipe(
      map(res => {
        if(res["connected"]){
          this.router.navigateByUrl('/');
        }
        else{

          return true;
        }
        this.loginService.loggedIn.next(res)
        return false;
      }),
    );
    }

}
