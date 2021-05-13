import { ConnectedUserService } from './../../services/connected-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connected-user',
  templateUrl: './connected-user.component.html',
  styleUrls: ['./connected-user.component.css']
})
export class ConnectedUserComponent implements OnInit {
  connectedUsers = []
  constructor(private connectedUserService : ConnectedUserService ) { }

  ngOnInit(): void {
    this.connectedUsers = this.connectedUserService.connectedUser;
    this.connectedUserService.getConnectedUsersObservable().subscribe((data)=>{
      this.onConnectedUserUpdate(data);
    })
  }
  onConnectedUserUpdate(data){
    this.connectedUsers = data;
  }

}
