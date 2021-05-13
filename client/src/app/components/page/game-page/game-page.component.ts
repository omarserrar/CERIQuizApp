import { QuizzServiceService } from './../../../services/quizz-service.service';
import { QuizzComponent } from './../../quizz/quizz.component';
import { Component, OnInit } from '@angular/core';
import { SocketServiceService } from 'src/app/services/socket-service.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  gameReady = false // Si le jeu est pret
  quizz : any // Information sur le quizz
  level : Number // Niveau du quizz
  score : Number // Score du quizz
  quizzEnded = false // SI le quizz est termine

  constructor(private quizzService:QuizzServiceService, private router : Router) { }

  ngOnInit(): void {

  }
  // Quand un quizz ce termine les boutons terminer et rejoueur et le menu de defi s'affiche
  onQuizzEnd(quizzResult){

    console.log(quizzResult)
    console.log(this.quizz)
    this.score = quizzResult.score
    for(var i in this.quizz.quizz){
      this.quizz.quizz[i].reponse = quizzResult.questions[i].bonneReponse
    }
    this.quizzEnded = true
  }
  // On recuperer un quizz a partir de la difficulte choisi
  loadGame(level): void{
    this.quizzEnded = false
    this.quizzService.downloadRandomQuizz(2, level).subscribe(function(data){
    console.log(data)
    this.level = level
    this.quizz = data

    this.gameReady = true
    }.bind(this))

  }
  // Utilisateur clique terminer
  terminer(){
    this.router.navigate(['/']);
  }
  // Utilisateur clique Rejoueur
  rejouer(){
    this.gameReady = false
    this.loadGame(this.level);
  }
}
