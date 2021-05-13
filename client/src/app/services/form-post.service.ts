import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
/*
   FormService permet d'envoyer les requete GET et POST
*/
export class FormService {
  static LOGIN_URL = "http://pedago.univ-avignon.fr:3209/login"
  static USER_URL = "http://pedago.univ-avignon.fr:3209/user"
  static USER_UPDATE_URL = "http://pedago.univ-avignon.fr:3209/user/update"
  static USERS_URL = "http://pedago.univ-avignon.fr:3209/users"
  static QUIZZ_URL = "http://pedago.univ-avignon.fr:3209/quizz"
  static QUIZZ_VALIDER = "http://pedago.univ-avignon.fr:3209/quizz/valider"
  static LOGOUT_URL = "http://pedago.univ-avignon.fr:3209/logout";
  static DEFI_URL = "http://pedago.univ-avignon.fr:3209/defi";
  static REFUSER_DEFI_URL =  "http://pedago.univ-avignon.fr:3209/defi/refuser";
  static TOP10_URL = "http://pedago.univ-avignon.fr:3209/top";
  static HISTORIQUE_DEFI_URL = "http://pedago.univ-avignon.fr:3209/user/%id%/historique/defi";

  constructor(private http: HttpClient, private loginService : LoginService) { }

  // Fonction pour envoyer une requete POST
  post(url: string , data) : Observable<any>{
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      withCredentials: true
    };
    data.sessionId = this.loginService.sessionID
    data.userId = this.loginService.userId
    return this.http.post<any>(url, data, options)
  }
  // Fonction pour envoyer une requete GET
  get(url: string , data: any) : Observable<any>{
    data.sessionId = this.loginService.sessionID
    data.userId = this.loginService.userId
    return this.http.get<any>(url, {params: data, withCredentials: true})
  }
}

