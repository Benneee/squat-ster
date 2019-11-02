import { BookingService } from './booking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Booking } from './bookings.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss']
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingSub: Subscription;
  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  onCancelBooking(bookingId: string, slidingBooking: IonItemSliding) {
    slidingBooking.close();
    this.loadingCtrl
      .create({
        message: 'Deleting booking....'
      })
      .then(loader => {
        loader.present();
        this.bookingService.cancelBooking(bookingId).subscribe(() => {
          loader.dismiss();
        });
      });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
