import { PrescriptionsPage } from './../prescriptions/prescriptions.page';
//env
import { environment } from "../../environments/environment";
//imports
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, from } from "rxjs";
import { map, tap, switchMap } from "rxjs/operators";
import { Plugins } from "@capacitor/core";

import { User } from "./user.model";

export interface AuthResponseData {
  user_id: string;
  user_email: string;
  user_full_name: string;
  token_type: string;
  expires_in: string;
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId = null;
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  public get userIsAuthenticated() {
    console.log("entre userIsAuthenticated");
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          // console.log("user exist");
          // console.log(!!user.access_token);
          return !!user.access_token;
        } else {
          console.log("user not exist");
          return false;
        }
      })
    );
  }
  public get user() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user;
        } else {
          return null;
        }
      })
    );
  }

  autoLogin() {
    return from(Plugins.Storage.get({ key: "user" })).pipe(
      map(storasgeData => {
        if (!storasgeData || !storasgeData.value) {
          return null;
        }
        const parsedData = JSON.parse(storasgeData.value) as {
          id: string;
          email: string;
          full_name: string;
          token_type: string;
          expires_in: string;
          access_token: string;
          refresh_token: string;
        };
        const user = new User(
          parsedData.id,
          parsedData.email,
          parsedData.full_name,
          parsedData.token_type,
          parsedData.expires_in,
          parsedData.access_token,
          parsedData.refresh_token
        );
        console.log("parsedata");
        // console.log(parsedData);
        return user;
      }),
      tap(user => {
        if (user) {
          this._user.next(user);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  login(email: any, password: any) {
    let data = JSON.stringify({
      username: email,
      password: password,
      grant_type: "password",
      client_id: 2,
      client_secret: environment.apiKey
    });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    console.log("hola");
    return this.http
      .post<AuthResponseData>(
        environment.serverUrl + "oauth/token",
        data,
        httpOptions
      )
      .pipe(
        tap(userData => {
          this._user.next(
            new User(
              userData.user_id,
              userData.user_email,
              userData.user_full_name,
              userData.token_type,
              userData.expires_in,
              userData.access_token,
              userData.refresh_token
            )
          );
          this.storeUserData(this._user.value);
        })
      );
  }
  logout() {
    this._user.next(null);
    Plugins.Storage.remove({ key: "user" });
  }

  setFcm(token:any) {
    return this.user.pipe(
      switchMap(
        user => {
          const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + user.access_token,
              'Content-Type': 'application/json'
            })
          };
          return this.http.post(
            environment.serverUrl + 'api/fcm/token',
            { fcmtoken: token },
            httpOptions
          );
        }
      )
    );
  }

  private storeUserData(user: User) {
    Plugins.Storage.set({ key: "user", value: JSON.stringify(user) });
  }

  prescription(){

    return this.user.pipe(switchMap(
      user => {
        return this.http.get(environment.serverUrl + 'api/profile/prescriptions/active',
            { headers:{Authorization: 'Bearer ' + user.access_token}}
          );
      }
    ));
  } 

  uploadPrescription(file: File ){
    const formData: FormData = new FormData();
    formData.append('prescription', file);
    return this.user.pipe(switchMap(
      user => {
        return this.http.post(environment.serverUrl + 'api/profile/prescriptions',
            formData,
            {
              headers: {
                        Authorization: 'Bearer ' + user.access_token
              }
            }
          );
      }
    ));
  }
}
