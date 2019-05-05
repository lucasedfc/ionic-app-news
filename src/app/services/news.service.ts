import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseTopHeadLines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-Key': apiKey
})
@Injectable({
  providedIn: 'root'
})
export class NewsService {


  constructor(
    private _http: HttpClient
  ) { }

  private executeQuery<T>( query: string ) {
    query = apiUrl + query;
    return this._http.get<T>(query, {headers});
  }

  getTopHeadLines() {
    return this.executeQuery<ResponseTopHeadLines>(`/top-headlines?country=ar&category=sports`);
    // tslint:disable-next-line:max-line-length
/*     return this._http.get<ResponseTopHeadLines>(apiUrl + '/top-headlines?country=ar&category=sports');
 */  }


  getTopHeadLinesByCategory(category: string) {
    return this.executeQuery<ResponseTopHeadLines>(`/top-headlines?country=ar&category=${category}`);
    // tslint:disable-next-line:max-line-length
   /*  return this._http.get<ResponseTopHeadLines>('https://newsapi.org/v2/top-headlines?country=ar&category=' + category ); */
  }

}
