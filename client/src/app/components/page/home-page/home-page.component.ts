import { Router } from '@angular/router';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user: any;
  lastVisite: any;
  constructor(private router: Router) {
    this.router.navigate(['/game'])

   }

  ngOnInit(): void {
  }

}
