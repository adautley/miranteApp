import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';

import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Novilha } from './../../models/novilha.model';

@Injectable()
export class NovilhaProvider {

  novilhas: FirebaseListObservable<Novilha[]>;

  constructor(
    public af: AngularFire,
    public http: Http
  ) {
    this.novilhas = this.af.database.list("/novilhas");
  }

  create(novilha: Novilha): firebase.Promise<void> {
    return this.novilhas
    .push(novilha);
  }


  novilhaExist(numero: number): Observable<boolean> {
    return this.af.database.list('/novilhas', {
      query: {
        orderByChild: 'numero',
        equalTo: numero
      }
    }).map((novilhas: Novilha[]) => {
      return novilhas.length > 0;
    })
  }

  editar(novilha: Novilha, key): firebase.Promise<void> {
    return this.af.database.object('/novilhas/' + key)
    .update(novilha);
  }

}
