import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:       string = 'VEY4EdXlQ1YT7ORruCZN6OnpPrnfNikC';
  private _tagsHistory: string[] = [];
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
  }

  public searchTag(tag: string): void {

    if(tag.length === 0) return;

    this.organizeHistory(tag);

    // fetch(`https://api.giphy.com/v1/gifs/search?api_key=VEY4EdXlQ1YT7ORruCZN6OnpPrnfNikC&q=colorfull&limit=10`)
    // .then(resp => resp.json())
    // .then(data => console.log(data));

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag)

    this.http.get(`${this.serviceUrl}/search`, {params})
    .subscribe(resp => {
      console.log(resp);
    });
  }
}
