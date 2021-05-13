import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
/*
  Component NavBar
*/
export class NavbarComponent implements OnInit {
  visible: boolean;
  user: any;
  displayDropDown = "none"
  constructor(private loginService : LoginService) {
    this.user = this.loginService.loggedUser;
    this.loginService.loggedIn.subscribe((res) => {
      console.log("Heere ",res)
      this.user = res.user;
    })
    console.log("User ",this.user);
   }

  ngOnInit(): void {
  }
  openCloseDropDown(){
    if(this.displayDropDown=="none")
    this.displayDropDown = "inherit"
    else
    this.displayDropDown="none"
  }
}
