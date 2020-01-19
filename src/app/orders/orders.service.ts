//env
import { environment } from "../../environments/environment";
//imports
import { Injectable } from '@angular/core';
import { map , tap, switchMap, take } from 'rxjs/operators';

import { Order , Item } from './order.model';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  private _orders = new BehaviorSubject<Order[]>(null); 
  private _activeOrders = new BehaviorSubject<Order[]>(null); 
  private orderList: Array<Order> = [];
  private activeOrderList: Array<Order> = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) { }

    get orders() {
      return this._orders.asObservable().pipe(map(
        orders => {
          if(orders) {
            return orders;
          } else {
            return null;
          }
        }
      ));
    }

    get activeOrders() {
      this.activeOrderList = [];
      return this._activeOrders.asObservable().pipe(map(
        orders => {
          if(orders) {
            return orders;
          } else {
            return null;
          }
        }
      ));
    }

    fetchActiveOrders(){
      return this.authService.user.pipe(switchMap(
        user => {
          return this.http.get(environment.serverUrl+'api/orders/actives',{ headers:{Authorization: 'Bearer ' + user.access_token}}).pipe(
            map( resData => {
              console.log('fetched orders');
              console.log(resData);
              resData['data'].forEach(element => {
                const order = new Order(
                  element['id'],
                  element['amount'],
                  element['quantity'],
                  element['deliveryDate'],
                  element['payDate']
                );
                this.activeOrderList.push(order);
              
              });
              this._activeOrders.next(this.activeOrderList);
             
            }
          ));
        }
      ));
    }   
    
    fetchOrders(){
      return this.authService.user.pipe(switchMap(
        user => {
          return this.http.get(environment.serverUrl+'api/orders',{ headers:{Authorization: 'Bearer ' + user.access_token}}).pipe(
            map( resData => {
              console.log(resData);            }
          ));
        }
      ));
    }    

  addOrder(items: Array<Item>) {


    return this.authService.user.pipe(
      switchMap(
        user => {
          const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + user.access_token,
              'Content-Type': 'application/json'
            })
          };
          return this.http.post(
            environment.serverUrl + 'api/orders',
            JSON.stringify(items),
            httpOptions
          );
        }
      )
    );
  }

  getOrder(id: any) {

    return this.authService.user.pipe(
      switchMap(
        user => {
          const httpOptions = {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + user.access_token

            })
          };
          return this.http.get(
            environment.serverUrl + 'api/orders/' + id, httpOptions
          );
        }
      )
    );
  }
  
}
