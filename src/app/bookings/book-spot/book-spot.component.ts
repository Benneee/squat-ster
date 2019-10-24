import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-book-spot',
  templateUrl: './book-spot.component.html',
  styleUrls: ['./book-spot.component.scss']
})
export class BookSpotComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedDateMode: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  /**
   * .dismiss() method closes the modal
   * If there are multiple modals in this component, we can pass an ID representing the
   * component we want to dismiss.
   * We can pass data back to the parent component using this dismiss method, for now,
   * I will be passing null since I don't intend to pass any data at this time
   * The role usually represents the purpose of the modal button, in this case,
   * the button is needed to cancel/close the modal and not book the spot
   * I could later pass in the dates an individual would like to book the spots for
   * into the object set in the onBookPlace() method
   */
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    this.modalCtrl.dismiss(
      { message: `Booked ${this.selectedPlace.title}` },
      'confirm'
    );
  }
}
