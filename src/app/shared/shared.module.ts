import { CommonModule } from '@angular/common';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [MapModalComponent, LocationPickerComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  providers: [SplashScreen, StatusBar],
  entryComponents: [MapModalComponent],
  exports: [LocationPickerComponent, MapModalComponent]
})
export class SharedModule {}
