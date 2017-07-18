import { Component, ViewChild } from '@angular/core';
import { ToastController,ViewController, Nav, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { NetworkProvider } from '../../providers/network-provider';
import { HomePage } from '../home/home';
import 'rxjs/Rx';



@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {

   @ViewChild(Nav) nav: Nav;
  attendance = [];
  login: {username?: string, password?: string} = {};
  submitted = false;
  instructor_data: any;
  rootPage: any;
  incorrect = false;


  constructor( 
      public popoverCtrl: PopoverController, 
      public alertCtrl: AlertController,
      public app: App,
      public loadingCtrl: LoadingController,
      public modalCtrl: ModalController,
      public navCtrl: NavController,
      public http: Http,
      public storage: Storage,
      public networkProvider: NetworkProvider,
	  public viewCtrl: ViewController,
      public toastCtrl: ToastController) { }

  onLogin(form) {

	    this.submitted = true;

	    if (form.valid) {
	        this.get_checker();
	    }

  }
   get_checker(){

       let udata = [];
       let loading = this.loadingCtrl.create({content:'Please wait...'});

       loading.present(); 

       this.http.get('http://'+ this.networkProvider.server_address +'/login.php?username=' + this.login.username + '&password=' + this.login.password)
            .map(res => res.json())
	            .subscribe(data => {

	            	//If get request if false
	                if(data == null){

	                    loading.dismiss();
	                    this.submitted = true;
	                    this.incorrect = true;
	                  
	                }
	                //Else if get request is true
	                else{

	                	
	                    loading.dismiss();
	                    this.showToast('You are now logged-in');
	                    this.storage.set('username', data.checker_username);
	                   	this.storage.set('logged_in', true);
	                    console.log(data);
	                    this.navCtrl.setRoot(HomePage);
	                }
	             
	            
	            },   
	            //if get request fails
	            error => {
                    
                    loading.dismiss();
                    console.log(error);
                    this.onLoginFailed('Opsss..' , 'Looks like you are not connected to the server');
                   
              });
  }
    
  hideInvalid(ev: any){
      
   
        this.submitted = false;
        this.incorrect = false;
   
   
  }
   onLoginFailed(title, subtitle) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: ['Ok']
      });

    alert.present();
  }
   showToast(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });

      toast.present(toast);
     
  }
}