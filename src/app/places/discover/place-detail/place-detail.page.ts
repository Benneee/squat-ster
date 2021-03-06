import { AuthService } from './../../../auth/auth.service';
import { BookingService } from './../../../bookings/booking.service';
import { BookSpotComponent } from './../../../bookings/book-spot/book-spot.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  private placeSub: Subscription;
  isBookable = false;
  isLoading = false;
  constructor(
    private navCtrl: NavController,
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramsMap => {
      if (!paramsMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      } else {
        this.isLoading = true;
        this.placeSub = this.placesService
          .getPlace(paramsMap.get('placeId'))
          .subscribe(place => {
            this.place = place;
            this.isBookable = place.userId !== this.authService.userId;
            this.isLoading = false;
          }, error => {
            this.alertCtrl.create({
              header: 'An error occurred',
              message: 'Place could not be found, please try again later',
              buttons: [{
                text: 'Okay',
                handler: () => {
                  this.router.navigate(['/places/tabs/discover']);
                }
              }]
            })
              .then(alert => {
                alert.present();
              })
          });
      }
    });

    console.log('place: ', this.place);
  }

  onBookPlace() {
    // this.navCtrl.navigateBack('/places/tabs/discover');
    // This is triggered once the book button is pressed
    this.actionSheetCtrl
      .create({
        header: 'Choose an action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      })
      .then(actionSheet => {
        actionSheet.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);

    this.modalCtrl
      .create({
        component: BookSpotComponent,
        componentProps: { selectedPlace: this.place, selectedDateMode: mode }
      })
      .then(modal => {
        modal.present();
        modal.onDidDismiss().then(dataFromModal => {
          console.log(dataFromModal.data, dataFromModal.role);
          if (dataFromModal.role === 'confirm') {
            this.loadingCtrl
              .create({
                message: 'Booking squat-spot'
              })
              .then(loader => {
                loader.present();
                const data = dataFromModal.data.bookingData;
                this.bookingService
                  .addBooking(
                    this.place.id,
                    this.place.title,
                    this.place.imageUrl,
                    data.firstName,
                    data.lastName,
                    data.guestNumber,
                    data.startDate,
                    data.endDate
                  )
                  .subscribe(() => {
                    loader.dismiss();
                  });
              });
          }
        });
      });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}

/**
 * onDidDismiss
 * This method helps us interact with the data being sent back from the modal
 * It returns a promise, which will help us chain another then block
 * to the existing then block and then use the data coming from the modal
 */
