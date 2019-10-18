import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from './../../places.service';
import { NavController } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss']
})
export class EditOfferPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) {}
  place: Place;
  editOfferForm: FormGroup;

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
      console.log('place: ', this.place);
      this.editOffer();
    });
  }

  onUpdateOffer() {
    if (!this.editOfferForm.valid) {
      return;
    }
    console.log('Updated', this.editOfferForm);
  }

  private editOffer() {
    this.editOfferForm = new FormGroup({
      title: new FormControl(this.place.title, {
        updateOn: 'change'
      }),
      descr: new FormControl(this.place.description, {
        updateOn: 'change',
        validators: [Validators.maxLength(180)]
      })
    });
  }
}
