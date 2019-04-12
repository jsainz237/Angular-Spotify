import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Spotify Artist Seach';
  token: string;
  artist: string = null;
  noInput: boolean = false;
  noResults: boolean = false;
  items: [];

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  searchForArtist() {
    if(this.artist === '' || this.artist === null) {
      this.noInput = true;
      return;
    } else { this.noInput = false; }
    let artistQ = this.artist
    this.data.searchArtist(artistQ).subscribe(async data => {
      this.items = await data['artists']['items'];
      console.log(this.items);
    })
  }
}
