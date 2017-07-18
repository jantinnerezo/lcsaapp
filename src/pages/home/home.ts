import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { NetworkProvider } from '../../providers/network-provider';
import { ActionSheetController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {AddAttendancePage} from '../add-attendance/add-attendance';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


	scanData : {};
	options :BarcodeScannerOptions;
	result1: any;
	result2: any;
  username: any;
  attendance_list = [];
  empty = true;
  no_connection = false;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              private barcodeScanner: BarcodeScanner,
              public storage: Storage,
              public http: Http,
              public loadingCtrl: LoadingController,
              public networkProvider: NetworkProvider,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController)  {


              this.checker();

  }


  //Get checker username and display to toolbar
  checker(){
    this.storage.get('username').then((value) => {
        this.username = value;
        console.log(value);
    });
  }

  /*scan(){
    this.options = {
        prompt : "Scan your barcode "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        console.log(barcodeData);
        this.scanData = barcodeData;
        this.result1 = barcodeData.text;
        this.result2 = barcodeData.format;
        this.showAlert(barcodeData.text, barcodeData.format, barcodeData.cancelled);

    }, (err) => {


        console.log("Error occured : " + err);
    });         
	} 

	showAlert(data1,data2,data3) {
    let alert = this.alertCtrl.create({
      title: 'Bar Code Result',
      subTitle: 'Object Results:' + data1 + ', ' + data2 + ',' + data3,
      buttons: ['OK']
    });
    alert.present();
  }*/


  //
   checker_options() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.username,
      buttons: [
        {
          text: 'New attendance',
          role: 'new',
          icon: 'add',
          handler: () => {
              this.add_attendance();
          }
        },{
          text: 'Logout',
          role: 'logout',
          icon: 'log-out',
          handler: () => {
              this.logout();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
           
          }
        }
      ]
    });
    actionSheet.present();
  }

   add_attendance() {
    let modal = this.modalCtrl.create(AddAttendancePage);
    modal.present();
  }

  fetch_attendance(){

        let loading = this.loadingCtrl.create({content:'Adding attendance...'});

        loading.present(); 
      this.http.get(this.networkProvider.server_address +'/attendance_list.php').map(res => res.json())
      .subscribe(data =>{
        
          if(data == null){

              loading.dismiss();
              this.empty = true;
              this.no_connection = false;


          }else{

              this.empty = false;
              this.no_connection = false;
              loading.dismiss();
              
              for(let x = 0; x <= data.length; x++){
                  let records = {

                      id: data[x].id,
                      title: data[x].title,
                      description: data[x].description,
                      created_time: data[x].created_time,
                      added_by: data[x].added_by,
                      type: data[x].type

                  }

                  this.attendance_list.push(records);
              }

          }

      },error =>{

            loading.dismiss();
            this.no_connection = true;

      });
  }

  logout(){

     this.storage.remove('username');
     this.storage.remove('logged_in');
     this.navCtrl.setRoot(LoginPage);
  }



}
