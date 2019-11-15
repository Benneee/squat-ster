import { AuthService } from "./../auth/auth.service";
import { Place } from "./place.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { take, map, tap, delay, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

// [
//   new Place(
//     "p1",
//     "Island Spot",
//     "A beautiful getaway island",
//     "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-600w-1048185397.jpg",
//     12999,
//     new Date("2019-01-01"),
//     new Date("2019-12-31"),
//     "abc"
//   ),
//   new Place(
//     "p2",
//     "Idaho spot",
//     "Chill at the capitol",
//     "https://image.shutterstock.com/image-photo/idaho-capitol-building-downtown-boise-600w-1213048531.jpg",
//     15999,
//     new Date("2019-01-01"),
//     new Date("2019-12-31"),
//     "abc"
//   ),
//   new Place(
//     "p3",
//     "Manhattan Spot",
//     "A beautiful getaway city",
//     "https://image.shutterstock.com/image-photo/sunset-on-downtown-manhattan-neighborhood-600w-1231019890.jpg",
//     11999,
//     new Date("2019-01-01"),
//     new Date("2019-12-31"),
//     "xyz"
//   ),
//   new Place(
//     "p4",
//     "Dubai Spot",
//     "Chill at The Burj",
//     "https://image.shutterstock.com/image-photo/dubai-uaemay-9-2019-worlds-600w-1408176182.jpg",
//     19999,
//     new Date("2019-01-01"),
//     new Date("2019-12-31"),
//     "abc"
//   )
// ]
interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: "root"
})
export class PlacesService {
  firebaseUrl = "https://squat-ster.firebaseio.com/offered-places.json";
  constructor(private authService: AuthService, private http: HttpClient) {}

  private _places = new BehaviorSubject<Place[]>([]);

  get places() {
    // return [...this._places];
    // After making the places a behavior subject, we need to make this method
    // an observable so we can subscribe to it in various places we need "places"
    return this._places.asObservable();
  }

  fetchPlaces() {
    return this.http.get<{ [key: string]: PlaceData }>(this.firebaseUrl).pipe(
      map(response => {
        const places = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            places.push(
              new Place(
                key,
                response[key].title,
                response[key].description,
                response[key].imageUrl,
                response[key].price,
                new Date(response[key].availableFrom),
                new Date(response[key].availableTo),
                response[key].userId
              )
            );
          }
        }
        return places;
      }),
      tap(places => {
        this._places.next(places);
      })
    );
  }

  getPlace(placeId: string) {
    return this.http
      .get<PlaceData>(
        `https://squat-ster.firebaseio.com/offered-places/${placeId}.json`
      )
      .pipe(
        map(placeData => {
          return new Place(
            placeId,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId
          );
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
    let generatedId: string;
    const newPlace = new Place(
      // While sending to Firebase, we don't need to add the randomly generated ID as well,
      // Firebase provides our data with individual IDs
      Math.random().toString(),
      title,
      description,
      "https://image.shutterstock.com/image-photo/dubai-uaemay-9-2019-worlds-600w-1408176182.jpg",
      price,
      dateFrom,
      dateTo,
      this.userId
    );
    // this._places.push(newPlace);
    // take allows us to get the current latest version of our places array

    // Since we want to show a loader here, we use the tap operator to make sure the
    // asynchronous process here is incomplete as subscribe will complete the process
    return this.http
      .post<{ name: string }>(this.firebaseUrl, {
        ...newPlace,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let allPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        // Because we are using behavioural subject for our places array
        // and the places observable is initiated as an empty array, 
        // We are unable to edit a place at a certain point in time e.g when you refresh
        // the edit-offer-form. The fix however is to ensure there's always "places"
        // at every point in time, this is achieved using the following lines
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
         // Get the id of the place we intend to update
         const updatedPlaceIndex = places.findIndex(
          place => place.id === placeId
        );

        // Get all of the pre-existing places and assign to this variable
         allPlaces = [...places];

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
         return this.http.put(
          `https://squat-ster.firebaseio.com/offered-places/${placeId}.json`,
          { ...allPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(allPlaces);
      })
    );
  }
}
