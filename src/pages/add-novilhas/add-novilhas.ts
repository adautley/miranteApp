import { AddVariasNovilhasPage } from './../add-varias-novilhas/add-varias-novilhas';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { NavController, NavParams, Loading, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { NovilhaProvider } from './../../providers/novilha/novilha.provider';

@Component({
  selector: 'page-add-novilhas',
  templateUrl: 'add-novilhas.html',
})
export class AddNovilhasPage {

  novilhaForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public novilhaProvider: NovilhaProvider,
    public modalCtrl: ModalController
  ) {

    this.novilhaForm = this.formBuilder.group({
      numero:[],
      observacao:[],
      qtdCrias: 0,
      ultCria: ""
    })
  }

  onSubmit(): void { 

    let loading: Loading = this.showLoading();

    this.novilhaProvider.create(this.novilhaForm.value)
    .then(() => {

      loading.dismiss(); 
      this.novilhaForm.reset();

    }).catch((error: any) => {

      console.log(error);
      loading.dismiss();
      this.showAlert(error)
    });
  }

  onAddVarias(): void {
    let modal = this.modalCtrl.create(AddVariasNovilhasPage);
    modal.present();
  //  modal.onDidDismiss(valorAtual => {
    //  this.ValorAtual = valorAtual;
  //  })
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
