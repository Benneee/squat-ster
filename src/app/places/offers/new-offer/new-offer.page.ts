import { PlacesService } from './../../places.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss']
})
export class NewOfferPage implements OnInit {
  constructor(private placesServices: PlacesService, private router: Router, private loadingCtrl: LoadingController) {}
  newOfferForm: FormGroup;
  ngOnInit() {
    this.createForm();
  }

  createOffer() {
    if (!this.newOfferForm.valid) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Creating squat-spot...'
    }).then(loader => {
      loader.present();
      this.placesServices.addPlace(
          this.controls.title,
          this.controls.descr,
          +this.controls.price,
          new Date(this.controls.date_from),
          new Date(this.controls.date_to)
        ).subscribe(() => {
          loader.dismiss();
          this.newOfferForm.reset();
          this.router.navigate(['/places/tabs/offers']);
      });
    });
  }

  private createForm() {
    this.newOfferForm = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      descr: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      date_from: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      date_to: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  get controls() {
    return this.newOfferForm.value;
  }
}
