import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable( { providedIn: 'root' } )

export class BookingService {
    private _bookings: Booking[] = [
        {
            id: 'b1',
            placeId: 'p1',
            userId: 'abc',
            placeTitle: 'Ruaka Place',
            guestNumber: 3
        }
    ];

    get bookings() {
        return [...this._bookings];
    }
}
