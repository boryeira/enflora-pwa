import { Component, OnInit } from '@angular/core';
import { Order } from '../orders/order.model';

import { OrdersService } from '../orders/orders.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  orderList: Array<Order> = [];

  constructor(
    private ordersService: OrdersService
    ) { }

  ngOnInit() {
    this.ordersService.fetchActiveOrders().subscribe();
  }

  ionViewWillEnter() {
    
    this.ordersService.activeOrders.subscribe(orders => {
    this.orderList = orders;
    console.log('entre lista ordenes');
    console.log(this.orderList);
    });
  }

  goToProducts(){
    
  }

}
