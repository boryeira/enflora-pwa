import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

import { Order, Item } from '../order.model';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

  id: any;
  order: Order;
  items: Array<Item>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.paramMap.subscribe(params => {
      this.ordersService.getOrder(params.get('id')).subscribe(
        orderResponse => {
          this.order = orderResponse;
        }
      );
      this.ordersService.getOrderItems(params.get('id')).subscribe(
        orderItemsResponse => {
          this.items = orderItemsResponse;
        }
      );

    })
  }
  destroy(){

  }

  orderPay(){
    this.route.paramMap.subscribe(params => {
     
    });
  }

}
