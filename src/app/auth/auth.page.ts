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
  isLogin = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onLogin(authForm: NgForm) {
    this.isLoading = true;
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    console.log(`email: ${email}, password: ${password}`);

    if (this.isLogin) {
      // Send request to login endpoint
      this.authService.logIn();
    } else {
      // Send request to sign up endpoint
    }

    this.openLoader();
  }

  switchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  private openLoader() {
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
  }
}
