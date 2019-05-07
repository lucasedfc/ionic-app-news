import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  news: Article[] = [];

  constructor(
    private storageService: Storage,
    public toastController: ToastController
  ) {
    this.loadFavorites();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  saveNews(news: Article) {

    const exists = this.news.find( data => data.title === news.title);
    if (!exists) {
      this.news.unshift(news);
      this.storageService.set('favorites', this.news);
    }

    this.presentToast('Favorite Added');
  }

  deleteNews(news: Article) {
    this.news = this.news.filter( data => data.title !== news.title);
    this.storageService.set('favorites', this.news);

    this.presentToast('Favorite Deleted');
  }

  async loadFavorites() {
    const favorites = await this.storageService.get('favorites');

    if (favorites) {
      this.news = favorites;
    }
  }
}
