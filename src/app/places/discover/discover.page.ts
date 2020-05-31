import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  places: Place[];
  listedPlaces: Place[];
  placesSub: Subscription;

  constructor( private placesService: PlacesService) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe((places) => {
      this.places = places;
      this.listedPlaces = places.slice(1);
    });
    console.log('nko hapa');
    console.log(this.places);
  }

  ionViewWillEnter() {
    this.placesService.fetchPlaces().subscribe();
  }

  ngOnDestroy() {
    if ( this.placesSub ) {
      this.placesSub.unsubscribe();
    }
  }

}
