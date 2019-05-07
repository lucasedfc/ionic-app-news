import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() element: Article;
  @Input() index: number;
  @Input() isFavorite;

  constructor(
    private iap: InAppBrowser,
    private actionController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService
  ) { }

  ngOnInit() {
    // console.log('favorite', this.isFavorite);
  }

  openNews() {
    console.log('new', this.element.url);
    const browser = this.iap.create(this.element.url, '_system');
  }

  async launchMenu() {

    let saveOrDeleteFav;
    if (this.isFavorite) { // delete favoite
      saveOrDeleteFav =  {
        text: 'Remove',
        icon: 'trash',
        handler: () => {
          console.log('Favorite removed');
          this.dataLocalService.deleteNews( this.element );
        }
      };

    } else {
      saveOrDeleteFav =  {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.saveNews( this.element );
        }
      };
    }
    const actionSheet = await this.actionController.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.element.title,
            this.element.source.name,
            '',
            this.element.url
          );
        }
      },
      saveOrDeleteFav,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
