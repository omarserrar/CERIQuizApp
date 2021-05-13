import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chrono',
  templateUrl: './chrono.component.html',
  styleUrls: ['./chrono.component.css']
})
export class ChronoComponent implements OnInit {
  @Output() onUpdate = new EventEmitter<any>();
  time = 0
  constructor() { }

  ngOnInit(): void {
    // Incremente le chrono chaque 1000ms et envoi le nouveau chrono au component quizz
    setInterval(()=>{
      this.time++
      this.onUpdate.emit(this.time)
    }, 1000);
  }

}
