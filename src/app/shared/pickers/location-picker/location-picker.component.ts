import { MapModalComponent } from './../../map-modal/map-modal.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss']
})
export class LocationPickerComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  pickLocation() {
    this.modalCtrl.create({ component: MapModalComponent }).then(modal => {
      modal.present();
    });
  }
}
