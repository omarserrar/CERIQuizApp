import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
  logout(){
    this.loginService.logout();
  }
}
