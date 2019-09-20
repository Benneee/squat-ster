import { Place } from './place.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor() {}

  private _places: Place[] = [
    new Place(
      'p1',
      'Island Spot',
      'A beautiful getaway island',
      'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-600w-1048185397.jpg',
      12999
    ),
    new Place(
      'p2',
      'Idaho spot',
      'Chill at the capitol',
      'https://image.shutterstock.com/image-photo/idaho-capitol-building-downtown-boise-600w-1213048531.jpg',
      15999
    ),
    new Place(
      'p3',
      'Manhattan Spot',
      'A beautiful getaway city',
      'https://image.shutterstock.com/image-photo/sunset-on-downtown-manhattan-neighborhood-600w-1231019890.jpg',
      11999
    ),
    new Place(
      'p4',
      'Dubai Spot',
      'Chill at The Burj',
      'https://image.shutterstock.com/image-photo/dubai-uaemay-9-2019-worlds-600w-1408176182.jpg',
      19999
    )
  ];

  get places() {
    return [...this._places];
  }

  getPlace(id: string) {
    return { ...this._places.find(p => p.id === id) };
  }
}
