import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  socket
  constructor() {
    this.socket = io('http://pedago.univ-avignon.fr:3209', {transports: ['websocket', 'polling', 'flashsocket']});
  }
  listen(eventname : string) : Observable<any> {
    return new Observable((subscribe) => {
    this.socket.on(eventname, (data) => {
    subscribe.next(data);
    })
    })
   }
  emit(event, data){
    this.socket.emit(event, data);
  }
}
