import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RecemNascido } from './../../models/recem-nascido.model';
import 'rxjs/add/operator/map';

@Injectable()
export class RecemNascidoProvider {

  recemNascidos: FirebaseListObservable<RecemNascido[]>;

  constructor(
    public af: AngularFire,
    public http: Http
  ) {
    this.recemNascidos = this.af.database.list("/recemnascidos");
  }

  create(recemNascido: RecemNascido): firebase.Promise<void> {
    return this.recemNascidos
    .push(recemNascido);
  }

  editar(recemNascido: RecemNascido, key): firebase.Promise<void> {
    return this.af.database.object('/recemnascidos/' + key)
    .update(recemNascido);
  }

}
