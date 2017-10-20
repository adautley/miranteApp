import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { Loading, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TouroProvider } from './../../providers/touro/touro.provider';

@Component({
  selector: 'page-add-touros',
  templateUrl: 'add-touros.html',
})
export class AddTourosPage {

  touroForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public touroProvider: TouroProvider
  ) {

    this.touroForm = this.formBuilder.group({
      numero:[],
      observacao:[],
      valor: []
    })
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();

    this.touroProvider.create(this.touroForm.value)
    .then(() => {

      loading.dismiss(); 

    }).catch((error: any) => {

      console.log(error);
      loading.dismiss();
      this.showAlert(error)
    });
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "Espere um pouco..."
    });

    loading.present();
    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    }).present();
  }
  
}
