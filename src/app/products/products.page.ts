import { Component, OnInit } from '@angular/core';

import { ProductsService } from './products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(private productService: ProductsService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.productService.fetchProducts().subscribe(
      response => {
        console.log('willenterprod');
        console.log(response);
      }
    );

  }

}
