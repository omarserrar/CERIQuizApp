import { FormService } from './form-post.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationBannerComponent } from '../components/notification-banner/notification-banner.component';
import { NotificationsBannerService } from './notifications-banner.service';

@Injectable({
  providedIn: 'root'
})
/*
  LoginService permet de gerer l'authentification, si l'utilisateur est connecte ses informations seront stocker ici
*/
export class LoginService {
  loggedIn : Subject<any>; // Observer par les autre components , quand un utilisateur ce connecte envoi un signal
  loggedUser;  // Utilisateur connecte
  sessionID; // ID de la session
  userId; // ID de l'utilisaeur connecte
  lastConnexion;
  constructor(private http: HttpClient, private router : Router, private notificationBanner: NotificationsBannerService) {
    this.loggedIn = new Subject();
    this.sessionID = localStorage.sessionID
    this.userId = localStorage.userId
  }
  // Deconnection
  logout(){
    // Envoi requette de deconnexion au serveur
    new FormService(this.http, this).get(FormService.LOGOUT_URL,{}).subscribe((data)=>{
      // Si l'utilisateur est deconnecte par le serveur
      // On supprime les informations on le redirige vers la page de connexion
      if(data.logout){
        //localStorage.removeItem('userId');
       // localStorage.removeItem('session');
        this.loggedUser = null;
        this.userId = null;
        this.sessionID = null
        this.router.navigate(['/', 'login']);
      }
    })
  }
  // Connexion
  login(username: string, password: string): void{

    //const data = new URLSearchParams();

    // On envoi la requete de connexion au serveur
    new FormService(this.http, this).post(FormService.LOGIN_URL, {username, password}).subscribe((data) => {

      if(data.connected){ // Si les information sont correct
        this.loggedUser = data.user
        this.loggedIn.next({connected: true})
        this.sessionID = data.session.sessionId
        this.userId = data.session.userId
  /*    localStorage.setItem('userId', data.session.userId);
        localStorage.setItem('session', this.sessionID); */

        let messageBandeau = "Bonjour "+this.loggedUser.prenom; // Message du bandeau
        if(localStorage.getItem('DateConnexion')){ // Si l'utilisateur a deja été connecté avant
          let date = new Date(Date.parse(localStorage.getItem('DateConnexion'))) // On recupere la derniere date de connexion
          console.log("Date ",date)
          this.lastConnexion = {}
          this.lastConnexion.j = date.getDate() // On recupere Jour mois annee heure de connexion
          this.lastConnexion.m = date.getMonth() + 1
          this.lastConnexion.y = date.getFullYear()
          this.lastConnexion.hr = date.getHours()
          messageBandeau += " Votre Dernière connexion était le "+this.lastConnexion.j+"/"+this.lastConnexion.m+"/"+this.lastConnexion.y+" à "+this.lastConnexion.hr+"h"; // Message du bandeau
        }
        localStorage.setItem('DateConnexion', new Date().toISOString()); //On met a jour la date de connexion
        this.notificationBanner.addSuccess(messageBandeau) // On envoi le message au component bandeau
        this.router.navigate(['/', 'game']); // On redirige le joueur vers la page d'acceuil
      }
      // Si les information de connexion sont incorrect
      else{
        if(data.error){
          this.loggedIn.next({connected: false, error: data.error})
          this.notificationBanner.addError(data.error) // On affiche le message d'erreur au bandeau
        }
      }
    })

  }
  isLoggedIn(): any{
    return new FormService(this.http, this).get(FormService.USER_URL, {})
  }
  update(humeur, avatar){
    return new FormService(this.http, this).post(FormService.USER_UPDATE_URL, {humeur, avatar})
  }
}
