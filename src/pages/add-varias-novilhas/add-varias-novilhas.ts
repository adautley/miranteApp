import { AngularFire } from 'angularfire2';
import { NovilhaProvider } from './../../providers/novilha/novilha.provider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Loading, LoadingController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/first';

@Component({
  selector: 'page-add-varias-novilhas',
  templateUrl: 'add-varias-novilhas.html',
})
export class AddVariasNovilhasPage {

  variasNovilhasForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public novilhaProvider: NovilhaProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public af: AngularFire
  ) {
    this.variasNovilhasForm = this.formBuilder.group({
      de: ['', Validators.required],
      ate: ['', Validators.required],
      observacao: []
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddVariasNovilhasPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  onSubmit(): void {

      let de = this.variasNovilhasForm.value.de;
      let ate = this.variasNovilhasForm.value.ate;
       
  
      if (parseInt(de) < parseInt(ate)) {

        for (var i=de; i <= ate; i++) {

          this.novilhaProvider.novilhaExist(i)
          .first()
          .subscribe((novilhaExist: boolean) => {
    
            if (!novilhaExist) {
              console.log('nao tem novilha com esse numero');
              
  
            } else {
              console.log('já tem novilha com esse numero');
            }
          })

        }





        for (var i=de; i <= ate; i++) {



          
          
                var Novilha = ({
                  numero: i,
                  observacao: this.variasNovilhasForm.value.observacao
            
                })
               // let loading: Loading = this.showLoading();
          
                this.novilhaProvider.create(Novilha)
                .then(() => {
  
                }).catch((error: any) => {
            
               //   console.log(error);
                //  loading.dismiss();
                //  this.showAlert(error)
                });
              }
  
      } else {
  
        this.showAlert("O primeiro número deve ser menor que o segundo!")
      }
  
      /*
      for (var i=de; i <= ate; i++) {
  
        var Novilha = ({
          numero: i,
          observacao: ""
        })
       // let loading: Loading = this.showLoading();
  
        this.novilhaProvider.create(Novilha)
        .then(() => {
    
         // loading.dismiss(); 
    
        }).catch((error: any) => {
    
       //   console.log(error);
        //  loading.dismiss();
        //  this.showAlert(error)
        });
      }
         */ 

    
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
