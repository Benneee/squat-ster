import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onLogin(authForm: NgForm) {
    this.isLoading = true;
    console.log('values: ', authForm);
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: 'Logging in...',
        spinner: 'bubbles'
      })
      .then(loadingElem => {
        loadingElem.present();
        // fake a request timing to show spinner
        setTimeout(() => {
          this.isLoading = false;
          loadingElem.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');
        }, 1500);
      });
    this.authService.logIn();
  }
}
