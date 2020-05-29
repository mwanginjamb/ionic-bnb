import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {

  place: Place;
  placeSub: Subscription;

  constructor( private placesSrvc: PlacesService, private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe( param => {
      if ( !param.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }

      this.placeSub = this.placesSrvc.getPlace(param.get('placeId')).subscribe( place => {
        this.place = place;
      });

      console.log(this.place);
      console.log(param.get('placeId'));

    });
  }

  ngOnDestroy() {
    if ( this.placeSub ) {
       this.placeSub.unsubscribe();
    }
  }
}
