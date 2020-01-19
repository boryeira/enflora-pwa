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

  id:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(params => {
      this.ordersService.getOrder(this.id).subscribe(
        orderResponse => {
          console.log(orderResponse);
        }
      )

    })
  }

}
