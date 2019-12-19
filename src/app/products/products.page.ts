import { Component, OnInit } from '@angular/core';

import { ProductsService } from './products.service';
import { NgForm, Validators } from '@angular/forms';

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
    private ordersService: OrdersService
    ) { }

  ngOnInit() {
    this.productService.fetchProducts().subscribe();
  }

  ionViewWillEnter() {
    // this.productService.fetchProducts(this.page).subscribe();
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
        console.log(data);
        this.items.push(new Item(data[0], data[1]));
      }
    });

    this.ordersService.addOrder(this.items).subscribe(
      response => {
        console.log(response['data']);
        
      },
      err => {
        console.log(err);
      }
    );

  }

}
