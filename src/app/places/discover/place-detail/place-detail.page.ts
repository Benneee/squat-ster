import { BookSpotComponent } from './../../../bookings/book-spot/book-spot.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
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
    private modalCtrl: ModalController
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
    this.modalCtrl
      .create({
        component: BookSpotComponent,
        componentProps: { selectedPlace: this.place }
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
