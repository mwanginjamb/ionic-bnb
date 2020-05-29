import { Component, OnInit } from '@angular/core';
import { OffersService } from './offers.service';
import { Place } from '../place.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

   offers: Place[];

  constructor( private offerService: OffersService, private router: Router ) { }

  ngOnInit() {
    this.offers = this.offerService.getoffers();
    console.log('OFFERS....');
    console.log(this.offers);
  }

  ngViewWillEnter() {
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
    console.log('Editing offer ', offerId);
  }


}
