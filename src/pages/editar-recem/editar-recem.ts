import { RecemNascidoProvider } from './../../providers/recem-nascido/recem-nascido.provider';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-editar-recem',
  templateUrl: 'editar-recem.html',
})
export class EditarRecemPage {

  recemForm: FormGroup;
  public Recem;
  public Key;

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public recemProvider: RecemNascidoProvider
  ) {
      this.Recem = navParams.get('RecemNascido');
      this.Key = navParams.get('Key');

      this.recemForm = this.formBuilder.group({
        numeroMae:[],
        observacao:[],
        dataNasc: [],
        sexo:[]
      })

  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();
    let formEditarNovilha = this.recemForm.value;

    this.recemProvider.editar(formEditarNovilha, this.Key)
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