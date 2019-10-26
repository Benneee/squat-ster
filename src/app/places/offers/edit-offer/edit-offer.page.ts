import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from './../../places.service';
import { NavController } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss']
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  editOfferForm: FormGroup;
  private placeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placeSub = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe(place => {
          this.place = place;
          this.editOffer();
        });
      console.log('place: ', this.place);
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

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
