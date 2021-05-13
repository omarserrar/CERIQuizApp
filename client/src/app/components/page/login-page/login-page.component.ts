import { LoginService } from '../../../services/login.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
/*
  Component de type Page
  Contient le contenue de la page de login
*/
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loggedIn: any;
  constructor(private loginService: LoginService, private formBuilder: FormBuilder){
    this.loginService.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }
  ngOnInit(): void {
      this.loginService.isLoggedIn()
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
      });

  }
  onSubmit(value: any): void{
    this.loginService.login(value.username, value.password)
  }

}
