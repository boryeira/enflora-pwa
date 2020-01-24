import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private AuthSub : Subscription;
  private PrevAuthState = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authservice: AuthService,
    private router: Router,
    private swUpdate: SwUpdate,
    private alertController: AlertController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkUpdate();
      setInterval(() => {
        this.swUpdate.checkForUpdate();
      } , 21600);
    });
  }

  checkUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async () => {
        const alert = await this.alertController.create({
          header: `App update!`,
          message: `Newer version of the app is available. It's a quick refresh away!`,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
            }, {
              text: 'Refresh',
              handler: () => {
                window.location.reload();
              },
            },
          ],
        });
        await alert.present();
      });
    }
  }

  ngOnInit(){
    this.AuthSub = this.authservice.userIsAuthenticated.subscribe(isAuth =>{
      if(!isAuth && this.PrevAuthState !== isAuth){
        this.router.navigateByUrl('/auth');
      }
      this.PrevAuthState = isAuth;
      
    });
  }

  ngOnDestroy(){
    if(this.AuthSub){
      this.AuthSub.unsubscribe();
    }
  }
  logout(){
    this.authservice.logout();
  }
}
