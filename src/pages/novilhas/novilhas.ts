import { AddNovilhasPage } from './../add-novilhas/add-novilhas';
import { Component } from '@angular/core';
import { EditarNovilhaPage } from './../editar-novilha/editar-novilha';
import { FirebaseListObservable } from 'angularfire2';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { NovilhaProvider } from './../../providers/novilha/novilha.provider';
import { Novilha } from './../../models/novilha.model';

@Component({
  selector: 'page-novilhas',
  templateUrl: 'novilhas.html',
})
export class NovilhasPage {
  qtdNovilhas = 0;
  novilhas: FirebaseListObservable<Novilha[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public novilhaProvider: NovilhaProvider
  ) {}

  ionViewDidLoad() {
    this.novilhas = this.novilhaProvider.novilhas;
  }

  onAddNovilha(): void {
    this.navCtrl.push(AddNovilhasPage);
  }

  onEditNovilha(novilha: Novilha, key): void {
    this.navCtrl.push(EditarNovilhaPage, {
      Novilha: novilha,
      Key: key
    });
  }

  ionViewDidEnter() {
    var db = firebase.database();
    var refNovilhas = db.ref("novilhas");

    refNovilhas.once('value').then(snapshot => {
      this.qtdNovilhas = snapshot.numChildren();      
    })
  }
}
