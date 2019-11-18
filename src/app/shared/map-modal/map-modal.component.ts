import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: true }) mapElementRef: ElementRef;

  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getGoogleMaps()
      .then(googleMaps => {
        const mapElement = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapElement, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 16
        });

        googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.renderer.addClass(mapElement, 'visible');
        });
      })
      .catch(err => console.log(err));
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  private getGoogleMaps(): Promise<any> {
    // Get the window object and set its type to any to avoid TS hullaballoo :)
    const win = window as any;
    // This will only be set as soon as we import the Google Maps JS SDK
    const googleModule = win.google;

    // We will check if googleModule already exists
    // This is important so that we don't import the module every time we try to pick a location
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    // Importing the Google Maps SDK now
    // We will return a promise from this import
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDhgl6rS41s-kfEHj_3P4CiZ0wrJ77aXAg';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google Maps not available');
        }
      };
    });
  }
}
