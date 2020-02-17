import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Order } from '../orders/order.model';

import { ToastController } from '@ionic/angular';
import { AngularFireMessaging } from '@angular/fire/messaging';


import { OrdersService } from '../orders/orders.service';

import {AuthService} from '../auth/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  orderList: Array<Order> = [];

  constructor(
    private ordersService: OrdersService,
    private afMessaging: AngularFireMessaging,
    private authservice: AuthService,
    public toastController: ToastController
    ) { }

  async presentToast(title, body) {
    const toast = await this.toastController.create({
      header: title,
      message: body,
      duration: 5000,
      position: 'top',
      color: 'primary'

    });
    toast.present();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.afMessaging.requestPermission.subscribe();
    this.afMessaging.requestToken.subscribe(
        (token) => {
          console.log('token'); 
          console.log(token); 
          this.authservice.setFcm(token).subscribe(response =>{
            console.log('entre fcm response');
            console.log(response);
          });
        },
        (error) => {console.log('error'); console.error(error); }
      );

    this.afMessaging.messages.subscribe((_messaging: any) => {
          console.log(_messaging.notification.body);
          this.presentToast(_messaging.notification.title, _messaging.notification.body);
        }
    );
    this.ordersService.fetchActiveOrders().subscribe();
    this.ordersService.activeOrders.subscribe(orders => {
    this.orderList = orders;
    console.log('entre lista ordenes');
    console.log(this.orderList);
    });
  }

  // goToProducts(){
    
  // }

}
