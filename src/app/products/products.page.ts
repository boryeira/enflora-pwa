import { Component, OnInit } from '@angular/core';

import { ProductsService } from './products.service'

import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  page : number = 1;
  productList:Array<Product> = [];

  constructor(private productService: ProductsService) { }

  ngOnInit() {

    this.productService.fetchProducts().subscribe();

  }

  ionViewWillEnter(){
    // this.productService.fetchProducts(this.page).subscribe();
    this.productService.products.subscribe(
      products => {
        console.log('entre porductosa');
        console.log(products);
        this.productList = products;
      }
    );
  }



}
