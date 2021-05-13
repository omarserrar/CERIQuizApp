import { LoginService } from './../../services/login.service';
import { QuizzServiceService } from './../../services/quizz-service.service';
import { DefiServiceService } from 'src/app/services/defi-service.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-historique-defi',
  templateUrl: './historique-defi.component.html',
  styleUrls: ['./historique-defi.component.css']
})
export class HistoriqueDefiComponent implements OnInit {
  historique : Array<any>
  loaded = false;
  nbMedales = 0
  @Input() user : any;
  constructor(private quizzServiceService: QuizzServiceService, private loginService: LoginService) { }

  ngOnInit(): void {
    if(!this.user){
      this.user = this.loginService.loggedUser;
      console.log("Useeeer ",this.user)
    }
    this.quizzServiceService.getHistoriqueDefi(this.user.id).subscribe((data)=>{
      this.historique = data.historique;
      this.nbMedales = data.win
    })
  }

}
