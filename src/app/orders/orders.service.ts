//env
import { environment } from "../../environments/environment";
//imports
import { Injectable } from '@angular/core';
import { map , tap, switchMap, take } from 'rxjs/operators';

import { Order , Item , Status} from './order.model';
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
  private orderItemsList: Array<Item> = [];
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
                  element['payDate'],
                  new Status(
                    element['status']['id'],
                    element['status']['css'],
                    element['status']['client']),
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
          ).pipe(map( Response => {
            console.log('entre map');
            console.log(Response);
            return new Order(
              Response['data']['id'],
              Response['data']['amount'],
              Response['data']['quantity'],
              Response['data']['deliveryDate'],
              Response['data']['payDate'],
              new Status(
                Response['data']['status']['id'],
                Response['data']['status']['css'],
                Response['data']['status']['client']),
            );
          }));
        }
     )
    );
  }

  getOrderItems(id: any) {
    this.orderItemsList = [];
    return this.authService.user.pipe(
      switchMap(
        user => {
          const httpOptions = {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + user.access_token

            })
          };
          return this.http.get(
            environment.serverUrl + 'api/orders/' + id + '/items', httpOptions
          ).pipe(map( Response => {
            
            Response['data'].forEach(element => {
              const item = new Item(
                element['id'],
                element['name'],
                element['amount'],
                element['quantity'],
                element['img']
              );
              this.orderItemsList.push(item);
            
            });
            return this.orderItemsList;
          }));
        }
     )
    );
  }

  pay(id: any){
    return this.authService.user.pipe(
      switchMap(
        user => {
          const httpOptions = {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + user.access_token

            })
          };
          return this.http.get(environment.serverUrl + 'api/orders/' + id + '/pay', httpOptions)
          .pipe(map((result: any) => { 
            return result['url'];
          }));
        }
      )
    );
  }
  destroy(id: any){
    return this.authService.user.pipe(
      switchMap(
        user => {
          const httpOptions = {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + user.access_token

            })
          };
          return this.http.delete(environment.serverUrl + 'api/orders/' + id, httpOptions)
          .pipe(map((result: any) => { 
            if(result['data'] === 'deleted'){
              return true;
            } else {
              return false;
            }
          }));
        }
      )
    );
  }
}
