import { UserService } from './../../services/user/user-service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  @Input() userId; // Information du joueur
  historique : any; // Historique du joueur
  constructor(private userService : UserService) { }
  // Recupere l'histoique du joueur pour l'afficher
  ngOnInit(): void {
    const diff = ['', 'Facile', 'Moyen', 'Difficile']
    this.userService.getUserHistory(this.userId).subscribe((data)=>{
      var hist = data.history
      for(var i in hist){
        var dateJeu = new Date(hist[i].date_jeu )
        hist[i].date_jeu = dateJeu.getDate()+"/"+(dateJeu.getMonth()+1)+"/"+dateJeu.getFullYear()+" "+((dateJeu.getHours()>9)?dateJeu.getHours():'0'+dateJeu.getHours())+":"+((dateJeu.getMinutes()>9)?dateJeu.getMinutes():'0'+dateJeu.getMinutes())
        hist[i].niveau_jeu = diff[hist[i].niveau_jeu];
      }
      this.historique = hist;
    });
  }

}
