import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

import { Order, Item } from '../order.model';
import { OrdersService } from '../orders.service';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Plugins } from '@capacitor/core';
import { browser } from 'protractor';

const { Browser } = Plugins;

interface BrowserOpenOptions {
  // iOS only: The presentation style of the browser. Defaults to fullscreen.
  presentationStyle ?: any;
  // A hex color to set the toolbar color to.
  toolbarColor ?: string;
  // The URL to open the browser to
  url : string;
  // Web only: Optional target for browser open. Follows the `target` property for window.open. Defaults to _blank
  windowName ?: string;
  }

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
    // private iab: InAppBrowser

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
        Browser.open({ url: payResponse});
        Browser.addListener('browserFinished',  (finish: any) => {
          console.log('cerrrooooo!!!!');
        })
        // var ref = this.iab.create(payResponse, '_blank');
        // ref.show();
        // ref.on('loadstart').subscribe(event =>{
        //   console.log('entro!');
        // });
        // ref.on('loadstop').subscribe(event =>{
        //   console.log('fin!');
        // });
      }
    );
  }

  payResponse
}
