import { AuthService } from './../auth/auth.service';
import { Place } from './place.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor(private authService: AuthService) {}

  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Island Spot',
      'A beautiful getaway island',
      'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-600w-1048185397.jpg',
      12999,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'Idaho spot',
      'Chill at the capitol',
      'https://image.shutterstock.com/image-photo/idaho-capitol-building-downtown-boise-600w-1213048531.jpg',
      15999,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'Manhattan Spot',
      'A beautiful getaway city',
      'https://image.shutterstock.com/image-photo/sunset-on-downtown-manhattan-neighborhood-600w-1231019890.jpg',
      11999,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'p4',
      'Dubai Spot',
      'Chill at The Burj',
      'https://image.shutterstock.com/image-photo/dubai-uaemay-9-2019-worlds-600w-1408176182.jpg',
      19999,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    )
  ]);

  get places() {
    // return [...this._places];
    // After making the places a behavior subject, we need to make this method
    // an observable so we can subscribe to it in various places we need "places"
    return this._places.asObservable();
  }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id === id) };
      })
    );
  }
  get userId() {
    return this.authService.userId;
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    imageUrl?: string
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://image.shutterstock.com/image-photo/dubai-uaemay-9-2019-worlds-600w-1408176182.jpg',
      price,
      dateFrom,
      dateTo,
      this.userId
    );
    // this._places.push(newPlace);
    // take allows us to get the current latest version of our places array

    // Since we want to show a loader here, we use the tap operator to make sure the
    // asynchronous process here is incomplete as subscribe will complete the process
    return this.places.pipe(
      take(1),
      // Fake a delay
      delay(2000),
      tap(places => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(2000),
      tap(places => {
        // Get the id of the place we intend to update
        const updatedPlaceIndex = places.findIndex(
          place => place.id === placeId
        );

        // Get all of the pre-existing places and assign to this variable
        const allPlaces = [...places];

        // Use the index of the place we intend to change to get it from the allPlaces array
        const oldPlace = allPlaces[updatedPlaceIndex];

        // Change it by overwriting its content with the arguments passed into this method
        allPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );

        // Emit the latest places list
        this._places.next(allPlaces);
      })
    );
  }
}
