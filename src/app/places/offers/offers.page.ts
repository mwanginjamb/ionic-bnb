import { Component, OnInit, OnDestroy } from '@angular/core';
import { OffersService } from './offers.service';
import { Place } from '../place.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { PlacesService } from '../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  offers: Place[];
  placesSub: Subscription;
  isLoading = false;

  constructor( private placesSrvc: PlacesService, private router: Router ) { }

  ngOnInit() {
    this.placesSub = this.placesSrvc.places.subscribe(places => {
      this.offers = places;
    });
    console.log('OFFERS....');
    console.log(this.offers);
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesSrvc.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
    console.log('Editing offer ', offerId);
  }

  ngOnDestroy() {
    if ( this.placesSub ) {
      this.placesSub.unsubscribe();
    }
  }


}
