import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;
  categories = ['entertainment', 'general', 'health', 'science', 'sports', 'technology'];

constructor(
 private  newsService: NewsService
) {

}
  ngOnInit() {
    this.segment.value = this.categories[0];
    this.newsService.getTopHeadLinesByCategory(this.categories[0])
    .subscribe( resp => {
      console.log('res', resp);
    },
    error => {
      console.log('err', error);
    })
  }
}

