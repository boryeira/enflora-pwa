//env
import { environment } from "../../environments/environment";
//imports
import { Injectable } from '@angular/core';
import { map , tap, switchMap, take } from 'rxjs/operators';

import { Order , Item } from './order.model';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) { }


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
              'Authorization': 'Bearer ' + user.access_token,
              'Content-Type': 'application/json'
            })
          };
          return this.http.get(
            environment.serverUrl + 'api/orders/' + id
          );
        }
      )
    );
  }
  
}
