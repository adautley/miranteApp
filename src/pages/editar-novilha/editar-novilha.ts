import { Cria } from './../../models/cria.model';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { NovilhaProvider } from './../../providers/novilha/novilha.provider';

@Component({
  selector: 'page-editar-novilha',
  templateUrl: 'editar-novilha.html',
})
export class EditarNovilhaPage {

  novilhaForm: FormGroup;
  crias: FirebaseListObservable<Cria[]>;
  public Novilha;
  public Key;

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public novilhaProvider: NovilhaProvider,
    public af: AngularFire,
  ) {
      this.Novilha = navParams.get('Novilha');
      this.Key = navParams.get('Key');

      this.novilhaForm = this.formBuilder.group({
        numero:[],
        observacao:[]
      })

  }

  ionViewDidLoad() {
    this.crias = this.af.database.list("novilhas/" + this.Key + "/novaCria")
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();
    let formEditarNovilha = this.novilhaForm.value;

    this.novilhaProvider.editar(formEditarNovilha, this.Key)
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
