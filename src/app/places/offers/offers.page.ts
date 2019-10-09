import { NavController, IonItemSliding } from '@ionic/angular';
import { PlacesService } from './../places.service';
import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss']
})
export class OffersPage implements OnInit {
  offers: Place[];

  constructor(private placesService: PlacesService, private router: Router) {}
  ngOnInit() {
    this.offers = this.placesService.places;
    console.log('offers: ', this.offers);
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigateByUrl(`/places/tabs/offers/edit/${offerId}`);
    console.log('ID: ', offerId);
  }
}
