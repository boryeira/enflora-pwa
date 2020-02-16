import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Order } from '../orders/order.model';

import { OrdersService } from '../orders/orders.service';
import { AngularFireMessaging } from '@angular/fire/messaging';

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
    ) { }

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
        }
      );
    this.ordersService.fetchActiveOrders().subscribe();
    this.ordersService.activeOrders.subscribe(orders => {
    this.orderList = orders;
    console.log('entre lista ordenes');
    console.log(this.orderList);
    });
  }

  goToProducts(){
    
  }

}
