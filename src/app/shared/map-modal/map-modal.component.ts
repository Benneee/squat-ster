import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit {

  constructor(private modalCtrl: ModalController)  { }

  ngOnInit() {}

  ngAfterViewInit() {

  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  private getGoogleMaps(): Promise<any> {
    // Get the window object and set its type to any to avoid TS hullaballoo :)
    const win = window as any;    
  }
}
