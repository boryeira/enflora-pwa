import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
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
