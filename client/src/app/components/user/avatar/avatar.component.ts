import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  @Input() userAvatar: any
  @Input() heigth: number
  constructor() {
    if(!this.heigth) this.heigth = 38
  }

  ngOnInit(): void {
  }

}
