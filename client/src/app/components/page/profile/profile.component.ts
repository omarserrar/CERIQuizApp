import { UserService } from './../../../services/user/user-service';
import { FormService } from './../../../services/form-post.service';
import { NotificationsBannerService } from './../../../services/notifications-banner.service';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Form, FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
/*
  Component de type Page
  Non fonctionnel pour le moment
*/
export class ProfileComponent implements OnInit {
  user:any
  edit = false;
  editHumeur : any;
  editAvatar : any;
  constructor(private loginService: LoginService, private route: ActivatedRoute, private userService: UserService) {

   }
  loadUser(user){
    if(!user) return
    this.user = user
    var diff = Math.floor(new Date().getTime() - new Date(this.user.date_naissance).getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff/day);
    var months = Math.floor(days/31);
    var years = Math.floor(months/12);
    this.user.age = years;
    this.editAvatar= new FormControl(this.user.avatar);
    this.editHumeur= new FormControl(this.user.humeur);
    console.log("Age "+this.user.age)
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['userId']){
        this.userService.getUser(params['userId']).subscribe((res) =>{
          this.loadUser(res.user)
        })
      }
      else{
        this.loadUser(this.loginService.loggedUser)
        this.loginService.loggedIn.subscribe((res) => {
          this.loadUser(res.user)
        })
      }
   });
  }
  startEdit(){
    this.edit = true;
  }
  stopEdit(){
    this.edit = false;
  }
  saveEdit(){
    if(this.editAvatar.value != this.user.avatar || this.editHumeur.value != this.user.humeur){
      this.loginService.update(this.editHumeur.value, this.editAvatar.value).subscribe((data)=>{
          this.user.avatar = this.editAvatar.value
          this.user.humeur = this.editHumeur.value
      })
    }
    this.stopEdit();
  }

}
