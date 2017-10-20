import { Component } from '@angular/core';
import firebase from 'firebase';
import { NavController } from 'ionic-angular';
import { NovilhasPage } from './../novilhas/novilhas';
import { RecemNascidosPage } from './../recem-nascidos/recem-nascidos';
import { TourosPage } from './../touros/touros';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Soma = 0;

  constructor(public navCtrl: NavController) {

  }

  onNovilhas(): void {
    this.navCtrl.push(NovilhasPage);
  }

  onTouros(): void {
    this.navCtrl.push(TourosPage);
  }

  onRecemNascidos(): void {
    this.navCtrl.push(RecemNascidosPage);
  }

  ionViewDidEnter() {

    var qtdTouros = 0;
    var qtdNovilhas = 0;
    var qtdRecem = 0;

    var db = firebase.database();
    var refTouros = db.ref("touros");
    var refNovilhas = db.ref("novilhas");
    var refRecem = db.ref("recemnascidos");

    refTouros.once('value').then(snapshot => {
      qtdTouros = snapshot.numChildren();

      refNovilhas.once('value').then(snapshot => {
        qtdNovilhas = snapshot.numChildren();

        refRecem.once('value').then(snapshot => {
          qtdRecem = snapshot.numChildren();
          this.Soma = qtdNovilhas + qtdRecem + qtdTouros;
        
  
        })

      })


    })
    
  }
  
}
