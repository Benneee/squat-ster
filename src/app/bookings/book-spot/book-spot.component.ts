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
  @Input() selectedDateMode: 'select' | 'random';
  startDate: string;
  endDate: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // To enable random date selection
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);

    if (this.selectedDateMode === 'random') {
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              availableFrom.getTime())
      ).toISOString();

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }
  }
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
