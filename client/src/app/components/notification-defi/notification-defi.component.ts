import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DefiServiceService } from 'src/app/services/defi-service.service';

@Component({
  selector: 'app-notification-defi',
  templateUrl: './notification-defi.component.html',
  styleUrls: ['./notification-defi.component.css']
})
export class NotificationDefiComponent implements OnInit {
  @Input('defi') defi : any
  difficulte : String
  removed = false;
  constructor(private router : Router, private defiServiceService : DefiServiceService) { }

  ngOnInit(): void {
    if(this.defi.defi.niveau == 1){
      this.difficulte = "Facile"
    }
    else if(this.defi.defi.niveau == 2){
      this.difficulte = "Moyen"
    }
    else if(this.defi.defi.niveau == 3){
      this.difficulte = "Difficle"
    }

  }
  accepterDefi(){
    console.log("accept def")
    this.router.navigateByUrl('/defi', { state: this.defi });
  }
  refuserDefi(){
    this.defiServiceService.refuserDefi(this.defi.defi._id).subscribe((data)=>{
      if(data.success){
        this.removed = true;
      }
    })
  }

}
