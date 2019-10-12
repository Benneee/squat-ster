import { PlacesService } from './../places.service';
import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];
  listedPlaces: Place[];
  constructor(private placesService: PlacesService) {}

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
    this.listedPlaces = this.loadedPlaces.slice(1);
  }

  onFilterPlaces(e: CustomEvent<SegmentChangeEventDetail>) {
    console.log(e.detail);
  }
}
