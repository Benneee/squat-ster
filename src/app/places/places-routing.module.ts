import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesPage } from './places.page';

// The path inside the children of the module must match the tabs name attribute's value found in the tabs markup: For Tabs
const routes: Routes = [
  {
    path: 'tabs',
    component: PlacesPage,
    children: [
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren:
              'src/app/places/discover/discover.module#DiscoverPageModule',
          },
          {
            path: ':placeId',
            loadChildren:
              'src/app/places/discover/place-detail/place-detail.module#PlaceDetailPageModule',
          },
        ],
      },
      {
        path: 'offers',
        children: [
          {
            path: '',
            loadChildren:
              'src/app/places/offers/offers.module#OffersPageModule',
          },
          {
            path: 'new',
            loadChildren:
              'src/app/places/offers/new-offer/new-offer.module#NewOfferPageModule',
          },
          {
            path: 'edit/:placeId',
            loadChildren:
              'src/app/places/offers/edit-offer/edit-offer.module#EditOfferPageModule',
          },
          {
            path: ':placeId',
            loadChildren:
              'src/app/places/offers/offer-bookings/offer-bookings.module#OfferBookingsPageModule',
          },
        ],
      },
      {
        path: '',
        redirectTo: '/places/tabs/discover',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/places/tabs/discover',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesRoutingModule {}
