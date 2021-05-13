import { Component, OnInit } from '@angular/core';
import { NotificationsBannerService } from 'src/app/services/notifications-banner.service';

@Component({
  selector: 'app-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.css']
})
/*
  Component Bandeau
*/
export class NotificationBannerComponent implements OnInit {
  type: string;
  visible: boolean;
  message: string;
  constructor(private notificationsBannerService : NotificationsBannerService) {
    this.notificationsBannerService.notifiations.subscribe(notification => {
      if(notification.type === "error" ){
        this.addError(notification.message)
      }
      else if(notification.type === "success"){
        this.addSuccess(notification.message)
      }
      else if(notification.visible==false){
        this.hide()
      }
    })
    this.visible = false;
    this.message = "test"
    this.type="success"
   }
   addError(message: string){
    this.type= "danger";
    this.message = message;
    this.visible = true
   }
   addSuccess(message: string){
    this.type= "success";
    this.message = message;
    this.visible = true
   }
   hide(){
    this.visible = false;
   }
  ngOnInit(): void {
  }

}
