import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

import { Order, Item } from '../order.model';
import { OrdersService } from '../orders.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Plugins } from '@capacitor/core';

// const { Browser } = Plugins;


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
    private activatedRoute: ActivatedRoute,
    private iab: InAppBrowser

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
  destroy(id:string){
      this.ordersService.destroy(id).subscribe(
        destroyResponse => {
         if(destroyResponse){
           this.router.navigateByUrl('/');
         }
        }
      );

  }

  pay(id: string){
    this.ordersService.pay(id).subscribe(
      payResponse => {
        const browser = this.iab.create('https://ionicframework.com/', '_blank');
        browser.on('loadstart').subscribe(event => {
        console.log('loadstart');
        });
        browser.on('loadstart').subscribe( event => {
        console.log('loadstop');
        });
        browser.on('loaderror').subscribe(event => {
        console.log('loaderror');
        });
        browser.on('exit').subscribe(event => {
        console.log('exit');
        });

      }
    );
  }


}
