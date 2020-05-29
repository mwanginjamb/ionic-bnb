import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  place: Place;
  placeSub: Subscription;

  constructor( 
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( param => {
      if ( !param.has('placeId')){
          // redirect to discover
          this.navCtrl.navigateBack('/places/tabs/discover');
          return;
      }

      this.placeSub = this.placesService.getPlace(param.get('placeId')).subscribe( (place) => {
        this.place = place;
      });

      // this.place = {...this.placesService.getPlace( param.get('placeId') )};
      console.log(param.get('placeId'));
    });
  }
  
  onBookPlace() {
       console.log('Trying to book a place.');
       this.modalCtrl.create({
         component: CreateBookingComponent, componentProps: { selectedPlace: this.place }
       }).then( modalEl => {
              modalEl.present();
              return modalEl.onDidDismiss();
       }).then( result => {
         console.table(result);
         if ( result.role == 'confirm' ){
           console.log('Booked :' + this.place.title + '!');
         }
       });
 }

 ngOnDestroy() {
  if ( this.placeSub ) {
      this.placeSub.unsubscribe();
  }
 }

}
