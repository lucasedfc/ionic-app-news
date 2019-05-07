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
  ) {
    this.loadFavorites();
  }

  saveNews(news: Article) {

    const exists = this.news.find( data => data.title === news.title);
    if (!exists) {
      this.news.unshift(news);
      this.storageService.set('favorites', this.news);
    }
  }

  async loadFavorites() {
    const favorites = await this.storageService.get('favorites');

    if (favorites) {
      this.news = favorites;
    }
  }
}
