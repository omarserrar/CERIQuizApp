import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question : any; // Input contenant les information sur la question
  @Output() questionValidee = new EventEmitter<any>(); // Executer quand l'utilisateur valide la question pour renvoyer la reponse choisi
  reponse:any  // Reponse choisi
  constructor() { }

  ngOnInit(): void {
  }
  valider(): void{
    this.questionValidee.emit({reponse: this.reponse}) // Envoi le resultat choisi au component quizz
  }
}
