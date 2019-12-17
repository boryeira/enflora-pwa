import { Component, OnInit } from '@angular/core';

import { ProductsService } from './products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  page : number = 2;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    
    this.productService.fetchProducts(this.page).subscribe();
  }

  ionViewWillEnter(){
    // this.productService.fetchProducts(this.page).subscribe();
    this.productService.products.subscribe(
      products => {
        console.log('entre porductosa');
        console.log(products);
      }
    );
  }

}
