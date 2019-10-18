import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss']
})
export class NewOfferPage implements OnInit {
  constructor() {}
  newOfferForm: FormGroup;
  ngOnInit() {
    this.createForm();
  }

  createOffer() {
    if (!this.newOfferForm.valid) {
      return;
    }
    console.log('*new offer: ', this.newOfferForm);
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
}
