import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { RecemNascidoProvider } from './../../providers/recem-nascido/recem-nascido.provider';
import firebase from 'firebase';

@Component({
  selector: 'page-add-recem',
  templateUrl: 'add-recem.html',
})
export class AddRecemPage {

  recemForm: FormGroup;
  public novilhaRef: firebase.database.Reference;
  novilhaLista: FirebaseListObservable<any[]>;

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public recemNascidoProvider: RecemNascidoProvider,
    public af: AngularFire
  ) {
    this.novilhaRef = firebase.database().ref('/novilhas');
    this.novilhaLista = af.database.list(`/novilhas/`);

    this.recemForm = this.formBuilder.group({
      numeroMae: [],
      observacao: [],
      sexo: [],
      dataNasc: []
    })
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();

    this.recemNascidoProvider.create(this.recemForm.value)
      .then(() => {

        var novaCria = {
          dataNasc: this.recemForm.value.dataNasc,
          sexo: this.recemForm.value.sexo,
          observacao: this.recemForm.value.observacao
        }
        console.log(this.recemForm.value.dataNasc);
        
        //pegar o numero da mãe e adicionar 1 numero a mais em qtd de crias e a data da última cria

        this.novilhaRef.orderByChild('numero').equalTo(this.recemForm.value.numeroMae)
          .on('child_added', function (snapshot) {
            
            window.localStorage.setItem('keyNovilha', snapshot.key)
            window.localStorage.setItem('qtdCrias', snapshot.val().qtdCrias)
            
          })

          setTimeout(() => {
            var keyNovilha = window.localStorage.getItem('keyNovilha'); 
            var qtdCrias = window.localStorage.getItem('qtdCrias'); 
            this.af.database.list('/novilhas/').update(keyNovilha, {
              qtdCrias: parseInt(qtdCrias) + 1,
              ultCria: this.recemForm.value.dataNasc,
            })
            this.af.database.list('/novilhas/' + keyNovilha + '/novaCria')
            .push(novaCria)
          },500)

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
