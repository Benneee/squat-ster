import { BookSpotComponent } from './../../../bookings/book-spot/book-spot.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NavController,
  ModalController,
  ActionSheetController
} from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(
    private navCtrl: NavController,
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramsMap => {
      if (!paramsMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      } else {
        this.place = this.placesService.getPlace(paramsMap.get('placeId'));
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
            console.log('Booked!');
          }
        });
      });
  }
}

/**
 * onDidDismiss
 * This method helps us interact with the data being sent back from the modal
 * It returns a promise, which will help us chain another then block
 * to the existing then block and then use the data coming from the modal
 */
