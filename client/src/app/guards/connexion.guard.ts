import { SocketServiceService } from 'src/app/services/socket-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { nextTick } from 'process';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
/*
  Permet de verifier si un utilisateur est connecte ou non
*/
export class ConnexionGuard implements CanActivate {
  constructor(private router : Router, private loginService : LoginService, private socketServiceService: SocketServiceService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Envoi un requete pour savoir si l'utilisateur est connecte ou non
    return this.loginService.isLoggedIn().pipe(
      map(res => {
        // L'utilisateur est connecte
        if(res["connected"]){
          this.loginService.loggedUser = res['user']
          this.loginService.sessionID = res['session'].sessionId
          this.loginService.userId = res['session'].userId
          this.loginService.lastConnexion = (localStorage.DateConnexion)?localStorage.DateConnexion:false;

      /*    localStorage.setItem('userId', res['session'].userId);
          localStorage.setItem('session', res['session'].sessionId);
          console.log("Res ",res)*/
          this.socketServiceService.emit("login", {username: this.loginService.loggedUser.identifiant, id: this.loginService.userId}); // Envoi un socket au serveur
        }
        // Si l'utilisateur n'est pas connecte
        else{
          this.router.navigateByUrl('/login');
        }
        this.loginService.loggedIn.next(res)
        return res["connected"];
      }),
      catchError((err) => {
        this.router.navigateByUrl('/login');
        return of(false);
      })
    );
  }
}
