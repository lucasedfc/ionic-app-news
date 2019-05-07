import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() element: Article;
  @Input() index: number;

  constructor(
    private iap: InAppBrowser
  ) { }

  ngOnInit() {}

  openNews() {
    console.log('new', this.element.url);
    const browser = this.iap.create(this.element.url, '_system');
  }

}
