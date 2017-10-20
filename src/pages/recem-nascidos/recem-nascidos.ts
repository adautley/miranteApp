import { AddRecemPage } from './../add-recem/add-recem';
import { Component } from '@angular/core';
import { EditarRecemPage } from './../editar-recem/editar-recem';
import { FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';
import { NavController, NavParams } from 'ionic-angular';
import { RecemNascido } from './../../models/recem-nascido.model';
import { RecemNascidoProvider } from './../../providers/recem-nascido/recem-nascido.provider';

@Component({
  selector: 'page-recem-nascidos',
  templateUrl: 'recem-nascidos.html',
})
export class RecemNascidosPage {
  qtdRecem = 0;

  recemNascidos: FirebaseListObservable<RecemNascido[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public recemNascidoProvider: RecemNascidoProvider
  ) {}

  ionViewDidLoad() {
    this.recemNascidos = this.recemNascidoProvider.recemNascidos;
  }

  onAddRecem(): void {
    this.navCtrl.push(AddRecemPage);
  }

  onEditRecem(recemNascido: RecemNascido, key): void {
    this.navCtrl.push(EditarRecemPage, {
      RecemNascido: recemNascido,
      Key: key
    });
  }

  ionViewDidEnter() {
    var db = firebase.database();
    var refRecem = db.ref("recemnascidos");

    refRecem.once('value').then(snapshot => {
      this.qtdRecem = snapshot.numChildren();      
    })
  }  
}
