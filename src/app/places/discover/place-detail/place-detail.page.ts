import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';


@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place;

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
          this.navCtrl.navigateBack('./places/tab/discover');
          return;
      }

      this.place = {...this.placesService.getPlace( param.get('placeId') )};
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
         if(result.role == 'confirm'){
           console.log('Booked :' + this.place.title + '!');
         }
       });
 }

}
