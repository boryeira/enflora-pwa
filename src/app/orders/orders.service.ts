//env
import { environment } from "../../environments/environment";
//imports
import { Injectable } from '@angular/core';

import { Order , Item } from './order.model';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient 
    ) { }


  addOrder(items: Array<Item>) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(
      environment.serverUrl + 'api/orders',
      JSON.stringify(items),
      httpOptions
    );
  }
}
