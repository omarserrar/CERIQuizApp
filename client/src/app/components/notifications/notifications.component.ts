import { SocketServiceService } from './../../services/socket-service.service';
import { DefiServiceService } from './../../services/defi-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  defis : any
  constructor(private defiServiceService:DefiServiceService, private socketServiceService : SocketServiceService) { }

  ngOnInit(): void {
    // Quand le component est charge pour la premier fois en recuper les notification via requete http
    this.defiServiceService.getAllDefi().subscribe((data)=>{
      this.defis = data
    })
    // On ecoute les notification renvoyer par le serveur via socket
    this.socketServiceService.listen('notification').subscribe((data)=>{
      console.log("Receive Notif ",data)
      this.defis.unshift(data)
    })
  }

}
