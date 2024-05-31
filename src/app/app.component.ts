import { Component } from '@angular/core';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    protected platform: Platform,
    protected router: Router,
    protected deeplinks: Deeplinks
  ) {
    this.platform.ready().then(() => {
      this.deeplinks
        .route({
          '/folder/:id': 'folder/:id'
        })
        .subscribe(
          (match) => {
            // match.$route - the route we matched, which is the matched entry from the arguments to route()
            // match.$args - the args passed in the link
            // match.$link - the full link data
            console.log('Successfully matched route', match);
            this.router.navigateByUrl(match.$link['path'])
          },
          (nomatch) => {
            // nomatch.$link - the full link data
            console.error("Got a deeplink that didn't match", nomatch);
          }
        );
    });
  }
}
