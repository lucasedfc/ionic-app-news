import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;
  categories = ['entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  news: Article[] = [];

constructor(
 private  newsService: NewsService
) {

}
  ngOnInit() {
    this.segment.value = this.categories[0];
    this.loadCategory(this.segment.value);
  }

  changeCategory( event) {
    this.news = [];
    this.loadCategory(event.detail.value);
  }

  loadCategory(category: string, event?) {
    this.newsService.getTopHeadLinesByCategory(category)
    .subscribe( resp => {
      this.news.push(...resp.articles);

      if (event) {
        event.target.complete();
      }
    },
    error => {
      console.log('err', error);
    });
  }

  loadData( event) {
    this.loadCategory(this.segment.value, event);
  }
}

