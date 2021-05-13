import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './defi-page.component.html',
  styleUrls: ['./defi-page.component.css']
})
export class DefiPageComponent implements OnInit {
  defiLoaded = false;
  quizzEnded = false;
  quizz : any;
  adversaire : any;
  level : any;
  score : Number;
  win : boolean;
  constructor(private router : Router) {
  }

  ngOnInit(): void {
    console.log(history.state.defi)
    if(history.state.defi){
      this.adversaire = history.state.user;
      this.quizz = history.state.defi;
      this.level = history.state.defi.niveau;
      this.defiLoaded = true
    }
  }
  onQuizzEnd(data){

    this.win = data.win;
    this.score = data.score;
    this.quizzEnded = true;
  }
}
