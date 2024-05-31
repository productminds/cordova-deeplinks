import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var BrazePlugin: any;

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public contentCardUrl!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(protected router: Router) {}

  ngOnInit() {
    BrazePlugin.changeUser('agus-testing');

    BrazePlugin.requestContentCardsRefresh();

    BrazePlugin.getContentCardsFromCache(
      (cards: any) => {
        console.log('cardss', cards);
        const [card] = cards;
        console.log(card.url);
      },
      (err: any) => {
        console.log(err);
      }
    );

    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
