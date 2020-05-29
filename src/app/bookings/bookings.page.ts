import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  loadedBookings: Booking[];

  constructor( private bookingService: BookingService) { }

  ngOnInit() {
    this.loadedBookings = this.bookingService.bookings;
  }

  onCancel(bookingId: string, bookingSlide: IonItemSliding){
      bookingSlide.close();
      console.log('Cancelling booking of place : ', bookingId);
  }

}
