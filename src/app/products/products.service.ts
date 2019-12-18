//env
import { environment } from '../../environments/environment';

//imports
import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map , tap, switchMap, take } from 'rxjs/operators';


import { AuthService } from '../auth/auth.service'
import { BehaviorSubject } from 'rxjs';

import { Product } from './product.model';

export interface ProductResponseData {
  ['data'] : {
    'id': string, 
    'name': string,
    'img': string,
    'value': string,
  } ,
  ['meta'] : {
    ['pagination']: {
      'count': number,
      'current_page': number,
      ['links']: {
        next: string
      }
      'per_page': number,
      'total': number,
      'total_pages': number,
    }, 

  }

}




@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _products = new BehaviorSubject<Product[]>(null); 
  private productList:Array<Product> = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  get products() {
    return this._products.asObservable().pipe(map(
      products => {
        if(products) {
          return products;
        } else {
          return null;
        }
      }
    ));
  }  

  // getProduct(id: string ) {
  //  return this.products.pipe(
  //    take(1),
  //    map(products => {
  //     return {...products.find(p =>{p => p.id === id})};
  //    }));
  // }  

  fetchProducts(){
    return this.authService.user.pipe(switchMap(
      user => {
        return this.http.get(environment.serverUrl+'api/products/actives',{ headers:{Authorization: 'Bearer ' + user.access_token}}).pipe(
          map( resData => {
            resData['data'].forEach(element => {
              const product = new Product(
                element['id'],
                element['name'],
                element['img'],
                element['value']
              );
              this.productList.push(product);
            
            });
            this._products.next(this.productList);
           
          }
        ));
      }
    ));
  }
}
