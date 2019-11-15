import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PlacesService } from "./../../places.service";
import {
  NavController,
  LoadingController,
  AlertController
} from "@ionic/angular";
import { Place } from "src/app/places/place.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"]
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  editOfferForm: FormGroup;
  isLoading = false;
  placeId: string;
  private placeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/offers");
        return;
      }
      this.placeId = paramMap.get("placeId");
      this.isLoading = true;
      this.placeSub = this.placesService
        .getPlace(paramMap.get("placeId"))
        .subscribe(
          place => {
            this.place = place;
            this.editOffer();
            this.isLoading = false;
          },
          error => {
            this.alertCtrl
              .create({
                header: "An error occurred!",
                message: "Place could not be found, please try again later",
                buttons: [
                  {
                    text: "Okay",
                    handler: () => {
                      this.router.navigate(["/places/tabs/offers"]);
                    }
                  }
                ]
              })
              .then(alert => {
                alert.present();
              });
          }
        );
    });
  }

  onUpdateOffer() {
    if (!this.editOfferForm.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: "Updating place..."
      })
      .then(loader => {
        loader.present();
        this.placesService
          .updatePlace(
            this.place.id,
            this.editOfferForm.value["title"],
            this.editOfferForm.value["description"]
          )
          .subscribe(() => {
            loader.dismiss();
            this.editOfferForm.reset();
            this.router.navigate(["/places/tabs/offers"]);
          });
      });
  }

  private editOffer() {
    this.editOfferForm = new FormGroup({
      title: new FormControl(this.place.title, {
        updateOn: "change"
      }),
      descr: new FormControl(this.place.description, {
        updateOn: "change",
        validators: [Validators.maxLength(180)]
      })
    });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
