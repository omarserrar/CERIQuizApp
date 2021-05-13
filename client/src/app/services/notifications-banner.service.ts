import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/*
  NotificationsBannerService permet de modifier l'etat de NotificationsBannerComponent
*/
export class NotificationsBannerService {
  notifiations: Subject<any>;
  constructor() { this.notifiations = new Subject<any>();}
  addError(message: String){
    this.notifiations.next({type: "error", message})
  }
  addSuccess(message: String){
    this.notifiations.next({type: "success", message})
  }
  hide(){
    this.notifiations.next({visible: false})
  }
}
