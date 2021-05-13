import { Injectable } from '@angular/core';
import { SocketServiceService } from './socket-service.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectedUserService {
  connectedUser = []
  constructor(private socketServiceService: SocketServiceService) {
    this.socketServiceService.emit('request', 'connectedUser')
    this.socketServiceService.listen('connectedUser').subscribe((data)=>{
      this.connectedUser = data;
    })
   }

  getConnectedUsersObservable(){
    return this.socketServiceService.listen('connectedUser');

  }

}
