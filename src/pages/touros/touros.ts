import { AddTourosPage } from './../add-touros/add-touros';
import { Component } from '@angular/core';
import { EditarTouroPage } from './../editar-touro/editar-touro';
import { FirebaseListObservable } from 'angularfire2';
import { NavController, NavParams } from 'ionic-angular';
import { Touro } from './../../models/touro.model';
import firebase from 'firebase';
import { TouroProvider } from './../../providers/touro/touro.provider';

@Component({
  selector: 'page-touros',
  templateUrl: 'touros.html',
})
export class TourosPage {
  qtdTouros = 0;
  touros: FirebaseListObservable<Touro[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public touroProvider: TouroProvider
  ) {}

  ionViewDidLoad() {
    this.touros = this.touroProvider.touros;
  }

  onAddTouro(): void {
    this.navCtrl.push(AddTourosPage);
  }

  onEditTouro(touro: Touro, key): void {
    this.navCtrl.push(EditarTouroPage, {
      Touro: touro,
      Key: key
    });
  }

  ionViewDidEnter() {
    var db = firebase.database();
    var refTouros = db.ref("touros");

    refTouros.once('value').then(snapshot => {
      this.qtdTouros = snapshot.numChildren();
     
    })
  }

}
