import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  token: string;

  constructor(private http: HttpClient) { 
    this.http.get('http://localhost:3000/token').subscribe(data => {
      this.token = data['access_token'];
    })
  }

  searchArtist(artist) {
    let artistQuery = artist.replace(/\s/g, '+');
    let httpUrl = `http://localhost:3000/search?artist=${artistQuery}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Token': this.token
      })
    }
    console.log(httpUrl);
    return this.http.get(httpUrl, httpOptions);
  }
}
