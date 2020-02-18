//env
import { environment } from "../../environments/environment";

import { Component, OnInit } from '@angular/core';
import { map , switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


import { Plugins } from '@capacitor/core';
import { AuthService } from '../auth/auth.service';


const { Browser } = Plugins;

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.page.html',
  styleUrls: ['./prescriptions.page.scss'],
})
export class PrescriptionsPage implements OnInit {

  prescription: any;
  prescriptionImage: File;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('prescription');
    this.authService.prescription().subscribe( response =>{
        console.log(response['data']);
        this.prescription = response['data'];
      },
      error => {
        this.prescription = null;
        console.log(error);
      })
  }

  goRecetaCannabica() {
    Browser.open({ url: 'https://www.recetacannabis.cl/' });
  }

  onFileChanged(event) {
    this.prescriptionImage = event.target.files[0];
    this.authService.uploadPrescription(this.prescriptionImage).subscribe( response =>{
        console.log(response['data']);
      },
      error => {
        console.log(error);
      })
  }

  // uploadPrescription() {
  //   console.log(this.prescriptionImage);
  // }

}
