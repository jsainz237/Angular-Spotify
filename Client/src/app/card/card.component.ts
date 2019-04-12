import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() artist: string = null;
  @Input() imageURL: string = null;
  @Input() id: string;
  @Input() artistURL: string = null;

  constructor() { }

  ngOnInit() {
    !this.imageURL ? this.imageURL = '../assets/images/no_agent.png' : null;
  }

}
