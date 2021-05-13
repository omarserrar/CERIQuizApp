import { SocketServiceService } from './../../services/socket-service.service';
import { QuizzServiceService } from './../../services/quizz-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.css']
})
export class TopTenComponent implements OnInit {
  rank : Array<any> // Classement
  loading = true;
  constructor(private quizzServiceService: QuizzServiceService, private socketServiceService: SocketServiceService) { }

  ngOnInit(): void {
    // Récupere le top10 en envoyant une requete http
    this.quizzServiceService.getTop10().subscribe((data)=>{
      this.rank = data;
      this.loading = false;
    })
    //Récuperer le top10 envoyer chaque 10 seconde par le serveur via socket
    this.socketServiceService.listen("top-players").subscribe((data=>{
      console.log("Received TOp 10")
      if(JSON.stringify(data) != JSON.stringify(this.rank)) // Comparer le top10 avec celui d'avant / si different remplace
        this.rank = data; // met a jour le top10
      this.loading = false; // fin de chargement
    }))
  }

}
