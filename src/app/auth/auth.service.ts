//env
import { environment} from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId = null;
  private _user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient 
    ) { }

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(map(user => {
      if(user){
        return !!user.token;
      } else {
        return false;
      }
    }));
  }
  get userId() {
      return this._userId;
    }

  login(email:any,password:any){
    

    
    let data=JSON.stringify({
      username: email,
      password: password,
      grant_type: 'password',
      client_id: 2,
      client_secret: environment.apiKey,
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
      })};

    return this.http.post(environment.serverUrl+"oauth/token",data,httpOptions).subscribe(
      data => {
        console.log(data);
        this._userIsAuthenticated = true;
      },
      err => {
        console.log(data);
        this._userIsAuthenticated = false;
      }
      );

    //this._userIsAuthenticated = true;
  }
  logout(){
    this._user.next(null);
  }
}
