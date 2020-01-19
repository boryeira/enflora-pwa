import { Component, OnInit } from '@angular/core';

import { Order } from '../orders/order.model';
import { OrdersService } from '../orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orderList: Array<Order> = [];

  constructor(private ordersService: OrdersService) { }
  ngOnInit() {
    // this.productService.fetchProducts().subscribe();
  }
  ionViewWillEnter() {
    this.ordersService.fetchActiveOrders().subscribe();
    this.ordersService.orders.subscribe(orders => {
      console.log('entre ordenes');
      console.log(orders);
      this.orderList = orders;
    });
  }
}
