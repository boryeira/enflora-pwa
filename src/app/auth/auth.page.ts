import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController,
    ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  userLogin() {
    this.authService.login();
    this.menuCtrl.enable(true);
    this.router.navigateByUrl('/home');

  }

}
