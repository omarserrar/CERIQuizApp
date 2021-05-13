import { FormService } from './../form-post.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private formService: FormService) { }
  // Recupere les information d'un utilisateur
  getUser(id: number){
    let url = FormService.USER_URL+"/"+id
    return this.formService.get(url, {})
  }
  // Recupere l'historique d'un utilisateur
  getUserHistory(id: number){
    let url = FormService.USER_URL+"/"+id+"/historique";
    return this.formService.get(url,{});
  }
}
