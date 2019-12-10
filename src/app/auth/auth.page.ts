import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { MenuController,LoadingController  } from '@ionic/angular';
import { NgForm } from '@angular/forms'
import { Observable } from 'rxjs';

import { AuthService,AuthResponseData } from './auth.service';

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
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  userLogin() {

  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    
    authObs = this.authService.login(email,password);
    authObs.subscribe(
      resData => {
        console.log('sii');
        console.log(resData);
        this.menuCtrl.enable(true);
        this.router.navigateByUrl('/dashboard');
      },
      err => {

      }

    );



  }

}
