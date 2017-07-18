import { Component } from '@angular/core';
import { LoadingController ,NavController, NavParams,ViewController, AlertController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http,Headers, RequestOptions } from '@angular/http';
import { NetworkProvider } from '../../providers/network-provider';

/**
 * Generated class for the AddAttendancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-attendance',
  templateUrl: 'add-attendance.html',
})
export class AddAttendancePage {

  title: any;
  description: any;
  type:any;
  private base_url = 'http://silentroom-pc/lcsa/api/';

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public viewCtrl: ViewController,
  	public alertCtrl: AlertController,
  	public storage: Storage,
  	public http: Http,
  	public toast: ToastController,
  	public loading: LoadingController,
  	public networkProvider: NetworkProvider) {
  }

  add(){

	  this.storage.get('username').then((value)=>{

	  		if(this.title == null){
		  		this.alert('Opsss..','title is required!');
		  	}else if(this.type == null){
		  		this.alert('Opsss..','type is required!');
		  	}else{
		  		this.alert('Success','proceed now');
		  		this.insert(value);
		  	}

	  });
	  	
  }
  insert(username){

  	  let progress = this.loading.create({content:'Adding attendance...'});

      progress.present(); 

  	  let data = "title=" + this.title + "&description=" + this.description + "&type=" + this.type + "&added_by=" + username;

  	  let body     : string   = "key=add_attendance&"+data,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.base_url + "create_update_delete.php";

      this.http.post(url, body, options)
      .subscribe((data) =>
      {
      	 
         // If the request was successful notify the user
         if(data.status === 200)
         {
           	progress.dismiss();
            this.msg('Attendance successfully added!')
            this.close();
         }
         // Otherwise let 'em know anyway
         else
         {
         	progress.dismiss();
            this.alert('Oopps..', 'something went wrong please try again.');
         }
      }, error => {

      		progress.dismiss();
      		this.alert('Oopps..', 'something went wrong please try again.');

      });
  }


  alert(title, subtitle) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: ['Ok']
      });

    alert.present();
  }

  msg(message) {
      let toast = this.toast.create({
        message: message,
        duration: 3000,
        position: 'top'
      });

      toast.present(toast);
     
  }

  close(){
  	this.viewCtrl.dismiss();
  }


}
