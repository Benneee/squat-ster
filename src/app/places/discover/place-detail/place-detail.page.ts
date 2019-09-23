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
      .create({ component: BookSpotComponent })
      .then(modal => modal.present());
  }
}
