import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseTopHeadLines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private _http: HttpClient
  ) { }

  getTopHeadLines() {
    return this._http.get<ResponseTopHeadLines>('https://newsapi.org/v2/top-headlines?country=ar&category=sports&apiKey=8bb993e5e3ce435e80b83c058b5ca0b4');
  }

}
