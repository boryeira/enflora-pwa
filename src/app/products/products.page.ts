import { Component, OnInit } from '@angular/core';

import { ProductsService } from './products.service';
import { NgForm, Validators } from '@angular/forms';
import { Route, Router, ROUTER_INITIALIZER} from '@angular/router';
import { Product } from './product.model';
import { Order, Item } from '../orders/order.model';
import { OrdersService } from '../orders/orders.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss']
})
export class ProductsPage implements OnInit {
  page = 1;
  productList: Array<Product> = [];
  orderform: NgForm;
  items: Array<Item>;

  constructor(
    private productService: ProductsService,
    private ordersService: OrdersService,
    private router: Router
    ) { }

  ngOnInit() {
    // this.productService.fetchProducts().subscribe();
  }

  ionViewWillEnter() {
    this.productService.fetchProducts().subscribe();
    this.productService.products.subscribe(products => {
      console.log('entre porductosa');
      console.log(products);
      this.productList = products;
    });
  }

  onSubmit(form: NgForm) {
    this.items = [];
    if (!form.valid) {
      console.log('noentre');
      return;
    }
    Object.entries(form.value).forEach(data => {
      if (data[1] && data[1] > 0) {
        console.log('data');
        console.log(data[1].toString());
        this.items.push(new Item(data[0],'','',data[1].toString(),''));
      }
    });
    console.log(this.items);
    this.ordersService.addOrder(this.items).subscribe(
      response => {
        console.log(response['data']);
        this.router.navigateByUrl('/orders/' + response['data']['id'] + '');
      },
      err => {
        console.log(err);
      }
    );

  }

}
