import { LoginService } from './../../services/login.service';
import { DefiServiceService } from './../../services/defi-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { SocketServiceService } from 'src/app/services/socket-service.service';

@Component({
  selector: 'app-defi',
  templateUrl: './defi.component.html',
  styleUrls: ['./defi.component.css']
})
export class DefiComponent implements OnInit {
  @Input() quizz: any;
  @Input() level: Number;
  @Input() score: Number;
  users;
  defiedUser = []
  userId
  constructor(private defiServiceService : DefiServiceService,private loginService : LoginService, private socketServiceService : SocketServiceService) { }

  ngOnInit(): void {
    this.userId = this.loginService.userId
    console.log(this.userId)
   this.getAllUser();
  }
  async getAllUser(){
    this.defiServiceService.getAllUser().subscribe((data)=>{
      if(!data.error)
      this.users = data;
    })
    console.log(this.users)
  }
  defier(id){
    let defi = {defie: id, quizz: this.quizz.quizz, niveau: this.level, score: this.score}
    console.log("QU ", defi)
    this.defiServiceService.defiUser(defi).subscribe((data)=>{
      if(data.success){
        this.defiedUser[id] = true
        console.log("Send notif")
        this.socketServiceService.emit('send-notification', {sender: this.loginService.userId, dest: id, data: {user: this.loginService.loggedUser, defi: data.resp}})
      }
    })

  }
}
