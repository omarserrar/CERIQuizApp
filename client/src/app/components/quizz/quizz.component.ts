import { QuizzServiceService } from './../../services/quizz-service.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input() quizz: Array<any>; // Input Information du quizz (questions..)
  @Input() level: number; // Niveau 1 facile 2 moyen 3 difficile
  @Input() isDefi = false; // Si c'est un defi 1 sinon si le joueur joue seul 0
  @Output() quizzEnd = new EventEmitter<any>(); // Output executer quand les quizz est termine pour envoyer les information au compenents parent
  questions: any // Tableau des question
  chrono: number // Timer
  index :number // Numero de la question actuel
  reponses = [] // Tableau des reponse

  termine=false // Quizz termine ou non
  resultat : any // Resultat (contient les reponses, score...) recuperer apres la validation du quizz a la fin
  correct : Number // Nombre de question correct recuperer apres la validation du quizz a la fin
  constructor(private quizzService : QuizzServiceService ) {
    this.index = 0
     }

  ngOnInit(): void {
    this.chrono = 0
    this.questions = this.quizz['quizz'] // Recupere les question de l'input
  }
  // Quand l'utilisateur repond a une question
  onAnswer(reponse: any){
    this.reponses.push({'reponse': JSON.parse(reponse.reponse), 'question': this.questions[this.index].id}) // On ajoute la reponse dans le tableau des reponse
    this.index++; // On passe a la question suivante
    if(this.questions.length == this.index){ // Si il n y a pas de question suivante (Fin du quizz) On valide le quizz par le serveur via requete http
      // On envoi au serveur l'id du quizz le nombre de reponse le temps total le niveau et si c'est un defi ou non
      this.quizzService.validerQuizz({id: this.quizz['_id'],  reponses: this.reponses, time: this.chrono, level: this.level, isDefi: this.isDefi}).subscribe((data)=>{
        this.resultat = data // On recupere le resultat renvoyer par le serveur
        this.correct = data.correct // On recupere le nombre de reponse correct
        this.quizzEnd.emit(this.resultat) // On envoie la reponse du serveur au component parent
      })
    }
  }
  // A chaque fois que le compenent chrono est mis a jour on met a jour la valeur chrono de ce component
  // Fonction passer en Output au component chrono
  onChronoUpdate(time){
    this.chrono = time;
  }

}
