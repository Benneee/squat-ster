import { Injectable } from '@angular/core';
import { Booking } from './bookings.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _bookings: Booking[] = [
    {
      id: 'x1',
      placeId: 'p1',
      placeTitle: 'Island Spot',
      userId: 'abc',
      guestNumber: 2
    }
  ];

  get bookings() {
    return [...this._bookings];
  }
}
