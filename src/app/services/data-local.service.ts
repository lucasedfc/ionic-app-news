import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  news: Article[] = [];

  constructor(
    private storageService: Storage
  ) { }

  saveNews(news: Article) {

    const exists = this.news.find( data => data.title === news.title);
    if (!exists) {
      this.news.unshift(news);
      this.storageService.set('favorites', this.news);
    }
  }

  loadFavorites() {

  }
}
